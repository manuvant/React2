import React from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';


const API_URL = 'http://64.225.46.83:3010/api';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
      color: 'black'
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));



const ProductList = (props) => {
    const classes = useStyles();

    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        axios.get(`${API_URL}/products`)
        .then(response => {
            setProducts(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const clickDelete = (id) => {
        axios.delete(`${API_URL}/products/${id}`)
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
    };
    


    return (
        <div>
            {products.map(
                product => <List>
                    <ListItem className={classes.demo}>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={product.name}
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={clickDelete(product.id)} edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
            </List>
            )}
        </div>
    )
};

export default ProductList