/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import  { getCocktails } from "../features/counterSlice";
import { useSelector, useDispatch } from "react-redux"
import { getAllCoctails, deleteCocktail } from "../features/counterSlice"
import Loader from "../loader/Loader";

function Home() {
    const [modalIsOpen,setModalIsOpen] = useState(false)
    const dispatch = useDispatch()
    const { loading } = useSelector ((state) => state.cocktails)
    const { cocktails, allCoctails } = useSelector((state) => state.cocktails)
    useEffect(() => {
        dispatch(getCocktails())
    },[])
    
    function appButtonHandler () {
        dispatch(getAllCoctails())
        closeModal()
    }
    
    
    function openModal () {
        dispatch(getCocktails())
        setModalIsOpen(true)  
    }

    function closeModal(){
        // dispatch(hideLoader())
        setModalIsOpen(false)
        // dispatch(closeLoader())
    }

 return (
    <div>
      <div>
          <button onClick={openModal}>Open modal</button>
      </div>
      {loading? <Loader /> : (  
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        appElement={null}
    >
            <button onClick={closeModal}>close</button>
        <form>
             <div>
                <label>idDrink</label>
                <h3>{cocktails?.idDrink}</h3>  
             </div> 
            <div>
                <label>strDrink</label>
                <h3>{cocktails?.strDrink}</h3>
             
            </div>
            <div>
             <img width={200} height={200} src={cocktails.strDrinkThumb} alt=""/>
            </div>  
        </form>
        <button onClick={appButtonHandler}>Add cocktail</button>
        </Modal>

      )}
        
        <div>
            {allCoctails.map((item)=>{
                const deletedId = item.idDrink
                return(<div key={item.idDrink}>
                    <div>
                        <p>{item?.idDrink}</p>
                    </div>
                    <div>
                        <p>{item?.strDrink}</p>
                    </div>
                    <div>
                        <img width={200} height={200} src={cocktails.strDrinkThumb} alt=""/>
                        <button type='button' onClick={()=> {
                            dispatch(deleteCocktail(deletedId))
                        }}>
                            X
                        </button>
                    </div>
                    </div>)
            })}
        </div>
      <div>
            <Link to="/login" >Logout</Link>
      </div>
    </div>
  );
}

export default Home;