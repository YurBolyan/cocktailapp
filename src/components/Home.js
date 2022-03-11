/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import  { getCocktails } from "../features/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import { addCocktails, deleteCocktail } from "../features/counterSlice";
import {Loader} from "../loader/Loader";
import styled from 'styled-components';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FormattedMessage } from "react-intl";


const LogoutButton = styled.div`
        margin-left: 90%;
        margin-top: 1%
 `
 const GetCocktail = styled.div`
    opacity: 0.8;
    background: green;
    color:rgb(60,60,60);
    text-align: center;
    cursor: pointer;
    font-size: 35px;
    
 `
 const Cocktaildata = styled.div`
    font-size: 20px;
    text-align: center;
    opacity: 0.9;
    background: green;
    color:rgb(60,60,60);
    width: 400px;
    heigth: 400px;
    margin-left: 25%;
    margin-top: 10px;
    border-radius: 20px;
 `
 
function Home() {
    const [modalIsOpen,setModalIsOpen] = useState(false)
    const dispatch = useDispatch()
    const { loading } = useSelector ((state) => state.cocktails)
    const { cocktails,allCoctails } = useSelector((state) => state.cocktails)
    useEffect(() => {
        dispatch(getCocktails())
    },[])
    
    function appButtonHandler () {
        dispatch(addCocktails())
        closeModal()
    }
    
    function openModal () {
        dispatch(getCocktails())
        setModalIsOpen(true)  
    }

    function closeModal(){
        setModalIsOpen(false)
    }
   return (
    <div>
        
     
       <GetCocktail>
          <div onClick={openModal}>
            <FormattedMessage
                id="getCocktail"
                defaultMessage="getCocktail"
            /></div>
       </GetCocktail>
        <div>
            <LogoutButton>
                <div className="btn btn-info btn-lg">
                <Link to="/login" >
                    <FormattedMessage
                        id="logout"
                        defaultMessage="logout"
                /></Link>
                </div>
            </LogoutButton>
        </div>
      
      {loading? <Loader /> : (  
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        appElement={null}
        style={{
            overlay: {
              position: 'fixed',
              top: 110,
              left: "420px",
              right: 0,
              bottom: 10,
            //   opacity: 1.5,
              backgroundColor: 'red',
              width: '50%',
              height: "70%",
              background: "green",
            },
            content: {

              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
            //   opacity: 1.5,
              border: '1px solid #fff',
              backgroundColor: 'green',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }
          }}
        >
            <button onClick={closeModal}>
                <FormattedMessage
                    id="close"
                    defaultMessage="close"
                /></button>
            <Cocktaildata>
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
                <label>strDrinkThumb</label>
             <h3><img width={200} height={200} src={cocktails.strDrinkThumb} alt=""/></h3>
            </div>  
        <button onClick={appButtonHandler}>
            <FormattedMessage
                id="addCocktail"
                defaultMessage="addCocktail"
            /></button>
            
        </form>

        </Cocktaildata> 
        </Modal>

      )}
      
        <div>
            {allCoctails.map((item)=>{
                const deletedId = item.idDrink
                return(
                    <Cocktaildata>
                <div key={item.idDrink}>
                    <div>
                        <img width={100} height={100} src={cocktails.strDrinkThumb} alt=""/>
                        <label>{item?.strDrink}</label>
                        <button type='button' onClick={()=> {
                            dispatch(deleteCocktail(deletedId))
                        }}>
                            <RiDeleteBin6Line/>
                        </button>
                    </div>
                </div>
                    </Cocktaildata>)
            })}
        </div>
        
    </div>
  );
}

export default Home;