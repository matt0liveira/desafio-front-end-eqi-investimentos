import React from 'react'
import './AppStyle.css'
import Form from './components/Form/Form'
import Result from './components/Result/Result'

export default () => {
    return (
        <div className="box">
            <header className="header">
                <h1>Simulador de investimentos</h1>
            </header>

            <div className="container">
                <Form />

                <Result />
            </div>
        </div>
    )
}