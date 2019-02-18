import { createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';


const styles = (theme: Theme) => createStyles({
	root: {
    margin: '70px 0px 0px 0px',
		backgroundColor: theme.palette.background.paper,
	},
  container: {
    padding: theme.spacing.unit,
    width: '100%',
  },
	button: {
		margin: theme.spacing.unit
	},
  grow: {
    flexGrow: 1
  }
});

export default styles

