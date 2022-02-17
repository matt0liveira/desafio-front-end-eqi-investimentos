import React, { useEffect, useState } from 'react'
import './Result.css'

export default () => {
    const [valorFinalBruto, setValorFinalBruto] = useState('')
    const [aliquotaIR, setAliquotaIR] = useState('')
    const [valorPagoIR, setValorPagoIR] = useState('')
    const [valorFinalLiquido, setValorFinalLiquido] = useState('')
    const [valorTotalInvestido, setValorTotalInvestido] = useState('')
    const [ganhoLiquido, setGanhoLiquido] = useState('')

    useEffect(() => {
        localStorage.clear('formValues')
    }, [])

    let formValues = JSON.parse(localStorage.getItem('formValues'))
    setInterval(() => {
        formValues = JSON.parse(localStorage.getItem('formValues'))
        setValorFinalBruto(formValues[0].valorFinalBruto)
        setAliquotaIR(formValues[0].aliquotaIR)
        setValorPagoIR(formValues[0].valorPagoIR)
        setValorFinalLiquido(formValues[0].valorFinalLiquido)
        setValorTotalInvestido(formValues[0].valorTotalInvestido)
        setGanhoLiquido(formValues[0].ganhoLiquido)
    }, 1000)

    return (
        <div className="result">
            <h2 className="result__title">Resultado da simulação</h2>

            <div className="result__values">
                <div className="result__value">
                    <h4 className="result__title">Valor final Bruto</h4>
                    <p>{ valorFinalBruto }</p>
                </div>

                <div className="result__value">
                    <h4 className="result__title">Alíquota do IR</h4>
                    <p>{ aliquotaIR }</p>
                </div>

                <div className="result__value">
                    <h4 className="result__title">Valor pago em IR</h4>
                    <p>{ valorPagoIR }</p>
                </div>

                <div className="result__value">
                    <h4 className="result__title">Valor Final Líquido</h4>
                    <p>{ valorFinalLiquido } </p>
                </div>

                <div className="result__value">
                    <h4 className="result__title">Valor Total Investido</h4>
                    <p>{ valorTotalInvestido }</p>
                </div>

                <div className="result__value">
                    <h4 className="result__title">Ganho Líquido</h4>
                    <p>{ ganhoLiquido }</p>
                </div>
            </div>
            
            <div className="result__graphic"></div>
        </div>
    )
}