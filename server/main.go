package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

var dbfile = "./data.db"

func init() {
	if _, err := os.Stat(dbfile); err != nil {
		os.Create(dbfile)
	}

	var err error
	db, err = sql.Open("sqlite3", dbfile)
	if err != nil {
		log.Fatal(err)
	}
	if _, err := createTable(); err != nil {
		log.Fatal(err)
	}
}

func createTable() (sql.Result, error) {
	var stmt = ""
	stmt += "CREATE TABLE IF NOT EXISTS todo ("
	stmt += " id INTEGER PRIMARY KEY AUTOINCREMENT"
	stmt += ", text TEXT NOT NULL "
	stmt += ", completed INTEGER NOT NULL)"
	return db.Exec(stmt)
}

func insertTable(act AddTodoAction) (sql.Result, error) {
	var stmt = ""
	stmt += "INSERT INTO todo "
	stmt += " (text, completed) "
	stmt += " VALUES("
	stmt += fmt.Sprintf("\"%v\"", act.Text)
	stmt += ",0)"
	return db.Exec(stmt)
}

func fetchAddTodoAction(id int64) (*AddTodoAction, error) {
	var stmt = ""
	stmt += fmt.Sprintf("SELECT * FROM todo where id = %v", id)
	rows, err := db.Query(stmt)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var act AddTodoAction
	for rows.Next() {
		var complete int64
		if err := rows.Scan(&act.ID, &act.Text, &complete); err != nil {
			return nil, err
		}
		if complete == 0 {
			act.Completed = false
		} else {
			act.Completed = true
		}
		break
	}
	return &act, nil
}

func fetchAllTodo() ([]AddTodoAction, error) {
	var stmt = ""
	stmt += fmt.Sprintf("SELECT * FROM todo")
	rows, err := db.Query(stmt)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var acts []AddTodoAction
	for rows.Next() {
		var act AddTodoAction
		var complete int64
		if err := rows.Scan(&act.ID, &act.Text, &complete); err != nil {
			return nil, err
		}
		if complete == 0 {
			act.Completed = false
		} else {
			act.Completed = true
		}
		acts = append(acts, act)
	}
	return acts, nil
}

func completeTodo(id int64) (sql.Result, error) {
	act, err := fetchAddTodoAction(id)
	if err != nil {
		return nil, err
	}

	format := "UPDATE todo SET completed = %d WHERE id = %d"
	stmt := ""
	if act.Completed {
		stmt = fmt.Sprintf(format, 0, id)
	} else {
		stmt = fmt.Sprintf(format, 1, id)
	}
	return db.Exec(stmt)
}

func deleteTodo(id int64) (sql.Result, error) {
	stmt := fmt.Sprintf("DELETE FROM todo WHERE id = %d", id)
	return db.Exec(stmt)
}

type AddTodoAction struct {
	Type      string `json:"type"`
	Text      string `json:"text"`
	Completed bool   `json:"completed"`
	ID        int64  `json:"id"`
}

func postAddTodoHandler(c *gin.Context) {
	var action AddTodoAction
	if err := c.ShouldBindJSON(&action); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var ret sql.Result
	var err error
	if ret, err = insertTable(action); err != nil {
		log.Printf("[INSERT] %v", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var id int64
	if id, err = ret.LastInsertId(); err != nil {
		log.Printf("[LAST INSERT ID] %v", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var act *AddTodoAction
	if act, err = fetchAddTodoAction(id); err != nil {
		log.Printf("[SELECT] %v", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"type":     action.Type,
		"text":     act.Text,
		"complete": act.Completed,
		"id":       act.ID,
	})
}

func postCompleteTodoHandler(c *gin.Context) {
	var action AddTodoAction
	if err := c.ShouldBindJSON(&action); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var err error
	if _, err = completeTodo(action.ID); err != nil {
		log.Printf("[COMPLETE] %v", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"type": action.Type, "id": action.ID})
}

func postDeleteTodoHandler(c *gin.Context) {
	var action AddTodoAction
	if err := c.ShouldBindJSON(&action); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var err error
	if _, err = deleteTodo(action.ID); err != nil {
		log.Printf("[DELETE] %v", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"type": action.Type, "id": action.ID})
}

func postFetchTodoHandler(c *gin.Context) {
	var acts []AddTodoAction
	var err error
	if acts, err = fetchAllTodo(); err != nil {
		log.Printf("[SELECT] %v", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"type": "FETCH_TODO",
		"data": acts,
	})
}

func main() {
	r := gin.Default()
	r.POST("/api/add_todo", postAddTodoHandler)
	r.POST("/api/complete_todo", postCompleteTodoHandler)
	r.POST("/api/delete_todo", postDeleteTodoHandler)
	r.GET("/api/fetch_todo", postFetchTodoHandler)
	r.Run(":3000")
}
