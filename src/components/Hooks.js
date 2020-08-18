import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const API_URL = 'http://64.225.46.83:3010/api'

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    rootLinearProgress: {
        width: '100%',
        '& > * + *': {
                        marginTop: theme.spacing(2)
                    }
    },
    rootSnackBar: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
  }));
const defaulProduct = {
    name: '',
    description: '',
    price: 0,
    isImportant: true,
    created: new Date(),
};

const CreandoProduct = (props) => {
    const classes = useStyles();
    
    const [product, setProduct] = React.useState(defaulProduct);

    const [productsList, setProductsList] = React.useState([]);

    const [loadingState, setLoadingState] = React.useState({
        loading: false,
        loaded: false,
        error: false,
    });

        React.useEffect(() => {
        axios.get(`${API_URL}/products`)
        .then(response => {
            setProductsList(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    });    
    


    const handleChange = (evt) => {
        console.log(evt.target.name)

        setProduct(
            {
                ...product,
                [evt.target.name]: evt.target.value
            }
        )
    }

    const clickCrear = (props) => {
        setLoadingState({
            ...loadingState,
            loading: true
        })

        axios.post(`${API_URL}/products`, product)
                .then(
                    response => {
                        console.log(response)
                        setProduct(defaulProduct)

                        setLoadingState({
                            ...loadingState,
                            loading: false,
                            loaded: true,
                            error: false
                        })
                    }
                )
                .catch(err => {
                    console.log(err)
                    setLoadingState({
                        ...loadingState,
                        loaded: true,
                        error: true
                    })
                })
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const handleClose = (props) =>{
        setLoadingState({
            ...loadingState,
            loaded: false
        })
    };

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                    name="name"
                    onChange={handleChange}
                    id="outlined-multiline-flexible"
                    label="Nombre"
                    multiline
                    rowsMax={4}
                    value={product.name}
                    variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                    name="description"
                    onChange={handleChange}
                    id="outlined-multiline-flexible"
                    label="Descripcion"
                    multiline
                    rowsMax={4}
                    value={product.description}
                    variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                    name="price"
                    onChange={handleChange}
                    id="outlined-multiline-flexible"
                    label="Precio"
                    multiline
                    rowsMax={4}
                    value={product.price}
                    variant="outlined"
                    />
                </div>

                <Button onClick={clickCrear} variant="contained" color="secondary">
                    Crear
                </Button>
                
                {
                    loadingState.loading ? (
                        <div className={classes.rootLinearProgress}>
                            <LinearProgress />
                        </div>
                    ) :
                    null
                }
                <div className={classes.rootSnackBar}>
                    <Snackbar open={loadingState.loaded} autoHideDuration={3000} onClose={handleClose}>
                        
                        {
                            !loadingState.error ? (
                                <Alert onClose={handleClose} severity="success">
                                    ProductoCreado!
                                </Alert>
                            ) : (
                                <Alert onClose={handleClose} severity="error">
                                    Error
                                </Alert>
                            )
                        }
                    </Snackbar>
                </div>
            </form>
        </div>
    )
};


export default CreandoProduct