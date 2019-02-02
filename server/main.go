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
		if err := rows.Scan(&act.ID, &act.Text, &act.Completed); err != nil {
			return nil, err
		}
		break
	}
	return &act, nil
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

	fmt.Println(action)

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
		"type":      action.Type,
		"text":      act.Text,
		"completed": act.Completed,
		"id":        act.ID,
	})
}

func main() {
	r := gin.Default()
	r.POST("/api/add_todo", postAddTodoHandler)
	r.Run(":3000")
}
