import React, { useState, useEffect } from 'react'
import './Form.css'
import CheckIcon from '@mui/icons-material/Check'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import api from '../../api'

export default () => {
    const [tipoIndexacao, setTipoIndexacao] = useState({
        pre: false,
        pos: true,
        fixado: false
    })
    const [tipoRendimento, setTipoRendimento] = useState({
        bruto: true,
        liquido: false
    })
    const [cdi, setCdi] = useState('')
    const [ipca, setIpca] = useState('')

    const changeTipoIndexacaoPre = () => {
        setTipoIndexacao({
            pre: true,
            pos: false,
            fixado: false
        })
    }

    const changeTipoIndexacaoPos = () => {
        setTipoIndexacao({
            pre: false,
            pos: true,
            fixado: false
        })
    }

    const changeTipoIndexacaoFixado = () => {
        setTipoIndexacao({
            pre: false,
            pos: false,
            fixado: true
        })
    }

    const changeTipoRendimento = () => {
        if (tipoRendimento.bruto) {
            setTipoRendimento({ bruto: false, liquido: true })
        } else {
            setTipoRendimento({ bruto: true, liquido: false })
        }
    }

    const validationForm = yup.object().shape({
        aporteInicial: yup.string().matches(/^[0-9.]+$/, 'Aporte deve ser um número').required('Campo obrigatório'),
        aporteMensal:yup.string().matches(/^[0-9.]+$/, 'Aporte deve ser um número').required('Campo obrigatório'),
        prazo:yup.string().matches(/^[0-9.]+$/, 'Mês deve ser um número').min(0, 'Campo deve ter um valor positivo').required('Campo obrigatório'),
        rentabilidade:yup.string().matches(/^[0-9.]+$/, 'Rentabilidade deve ser um número').required('Campo obrigatório'),
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(validationForm)
    })

    const onSubmit = async () => {
        let response = [{}]
        if(tipoRendimento.bruto && tipoIndexacao.pos) {
            response = await api.submitSimulation('pos', 'bruto')
        } else if(tipoRendimento.bruto && tipoIndexacao.pre) {
            response = await api.submitSimulation('pre', 'bruto')
        } else if(tipoRendimento.bruto && tipoIndexacao.fixado) {
            response = await api.submitSimulation('ipca', 'bruto')
        } else if(tipoRendimento.liquido && tipoIndexacao.pos) {
            response = await api.submitSimulation('pos', 'liquido')
        } else if(tipoRendimento.liquido && tipoIndexacao.pre) {
            response = await api.submitSimulation('pre', 'liquido')
        } else if(tipoRendimento.liquido && tipoIndexacao.fixado) {
            response = await api.submitSimulation('ipca', 'liquido')
        } else {
            alert('Erro')
        }
        localStorage.setItem('formValues', JSON.stringify(response))
    }

    const getIndicadores = async () => {
        let json = await api.getIndicadores()
        setCdi(json[0].valor)
        setIpca(json[1].valor)
    }

    useEffect(() => {
        getIndicadores()
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <h2 className="form__title">Simulador</h2>

            <div className="form__field">
                <label className="form__label">
                    Rendimento
                    <InfoOutlinedIcon style={{ color: '#555', fontSize: '20px', cursor: 'pointer' }} />
                </label>
                <div className="form__buttons-rendimento">
                    {tipoRendimento.bruto &&
                        <>
                            <button 
                                className="btn-rendimento btn-rendimento--bruto btn-active" 
                                onClick={changeTipoRendimento} 
                                value={tipoRendimento.bruto}>
                                    <CheckIcon style={{ color: "#fff", fontSize: '14px' }} />
                                    Bruto
                            </button>

                            <button 
                                className="btn-rendimento btn-rendimento--liquido" 
                                onClick={changeTipoRendimento}
                                value={tipoRendimento.liquido}>
                                    Líquido
                            </button>
                        </>
                    }

                    {!tipoRendimento.bruto &&
                        <>
                            <button 
                                className="btn-rendimento btn-rendimento--bruto" 
                                onClick={changeTipoRendimento}
                                value={tipoRendimento.bruto}>
                                    Bruto
                            </button>

                            <button 
                                className="btn-rendimento btn-rendimento--liquido btn-active" onClick={changeTipoRendimento}
                                value={tipoRendimento.liquido}>
                                    <CheckIcon style={{ color: '#fff', fontSize: '14px' }} />
                                    Líquido
                            </button>
                        </>
                    }
                </div>
            </div>

            <div className="form__field">
                <label className="form__label">
                    Tipos de indexação
                    <InfoOutlinedIcon style={{ color: '#555', fontSize: '20px', cursor: 'pointer' }} />
                </label>
                <div className="form__buttons-indexacao">
                    {tipoIndexacao.pos &&
                        <>
                            <button 
                                className="btn-indexacao btn-indexacao--pre" 
                                onClick={changeTipoIndexacaoPre}
                                value={tipoIndexacao.pre}>
                                    pré
                            </button>

                            <button 
                                className="btn-indexacao btn-indexacao--pos btn-active" 
                                onClick={changeTipoIndexacaoPos}
                                value={tipoIndexacao.pos}>
                                    <CheckIcon style={{ fontSize: '14px' }} />
                                    pos
                            </button>

                            <button 
                                className="btn-indexacao btn-indexacao--fixado" 
                                onClick={changeTipoIndexacaoFixado}
                                value={tipoIndexacao.fixado}>
                                    fixado
                            </button>
                        </>
                    }

                    {tipoIndexacao.pre &&
                        <>
                            <button 
                                className="btn-indexacao btn-indexacao--pre btn-active" 
                                onClick={changeTipoIndexacaoPre}
                                value={tipoIndexacao.pre}>
                                    <CheckIcon style={{ fontSize: '14px' } } />
                                    pré
                            </button>

                            <button 
                                className="btn-indexacao btn-indexacao--pos" 
                                onClick={changeTipoIndexacaoPos}
                                value={tipoIndexacao.pos}>
                                    pos
                                </button>

                            <button 
                                className="btn-indexacao btn-indexacao--fixado" 
                                onClick={changeTipoIndexacaoFixado}
                                value={tipoIndexacao.fixado}>
                                    fixado
                            </button>
                        </>
                    }

                    {tipoIndexacao.fixado &&
                        <>
                            <button 
                                className="btn-indexacao btn-indexacao--pre" 
                                onClick={changeTipoIndexacaoPre}
                                value={tipoIndexacao.pre}>
                                    pre
                            </button>

                            <button 
                                className="btn-indexacao btn-indexacao--pos" 
                                onClick={changeTipoIndexacaoPos}
                                value={tipoIndexacao.pos}>
                                    pos
                            </button>

                            <button 
                                className="btn-indexacao btn-indexacao--fixado btn-active"
                                onClick={changeTipoIndexacaoFixado}
                                value={tipoIndexacao.fixado}>
                                    <CheckIcon style={{ fontSize: '14px' }} />
                                    fixado
                            </button>
                        </>
                    }
                </div>
            </div>

            <div className="form__field">
                <label style={{ color: errors.aporteInicial ? '#ff0000' : '' }} className="form__label">Aporte inicial</label>
                <input 
                    type="text" 
                    name="aporteInicial"
                    id="aporteInicial" 
                    className="form__input" 
                    {...register('aporteInicial')}
                    style={{ borderColor: errors.aporteInicial ? '#ff0000' : ''}} />
                <h6 style={{ color: '#ff0000', margin: 0 }}>{ errors.aporteInicial?.message }</h6>
            </div>

            <div className="form__field">
                <label style={{ color: errors.aporteMensal ? '#ff0000' : '' }} className="form__label">Aporte mensal</label>
                <input 
                    type="text"
                    name="aporteMensal"
                    id="aporteMensal" 
                    className="form__input"
                    {...register('aporteMensal')}
                    style={{ borderColor: errors.aporteMensal ? '#ff0000' : '' }} />
                <h6 style={{ color: '#ff0000', margin: 0 }}>{ errors.aporteMensal?.message }</h6>
            </div>

            <div className="form__field">
                <label style={{ color: errors.prazo ? '#ff0000' : '' }} className="form__label">Prazo (em meses)</label>
                <input 
                    type="text"
                    name="prazo"
                    id="prazo"
                    className="form__input" 
                    {...register('prazo')}
                    style={{ borderColor: errors.prazo ? '#ff0000' : '' }} />
                <h6 style={{ color: '#ff0000', margin: 0 }}>{ errors.prazo?.message }</h6>
            </div>

            <div className="form__field">
                <label style={{ color: errors.rentabilidade ? '#ff0000' : '' }} className="form__label">Rentabilidade</label>
                <input 
                    type="text" 
                    name="rentabilidade"
                    id="rentabilidade" 
                    className="form__input"     
                    {...register('rentabilidade')}
                    style={{ borderColor: errors.rentabilidade ? '#ff0000' : '' }} />
                <h6 style={{ color: '#ff0000', margin: 0 }}>{ errors.rentabilidade?.message }</h6>             
            </div>

            <div className="form__field">
                <label  style={{ color: errors.ipca ? '#ff0000' : '' }} className="form__label">IPCA (ao ano)</label>
                <input 
                    type="text"
                    name="ipca" 
                    id="ipca" 
                    className="form__input"
                    value={ ipca }
                    {...register('ipca')}
                    style={{ borderColor: errors.ipca ? '#ff0000' : '' }} />
                <h6 style={{ color: '#ff0000', margin: 0 }}>{ errors.ipca?.message }</h6>
            </div>

            <div className="form__field">
                <label style={{ color: errors.cdi ? '#ff0000' : '', margin: 0 }} className="form__label">CDI (ao ano)</label>
                <input 
                    type="text" 
                    name="cdi"
                    id="cdi" 
                    className="form__input"
                    value={ cdi }
                    {...register('cdi')}
                    style={{ borderColor: errors.cdi ? '#ff0000' : '' }} />
                <h6 style={{ color: errors.cdi ? '#ff0000' : '', margin: 0 }}>{ errors.cdi?.message }</h6>
            </div>

            <div className="form__action">
                <input
                    type="reset" 
                    className="button-action button-action--reset" 
                    value="Limpar campos" />
            </div>

            <div className="form__action">
                <button 
                    type="submit" 
                    className="button-action button-action--submit"
                    disabled={errors.aporteInicial || errors.aporteMensal || errors.prazo || errors.rentabilidade ? true : false}>
                        Simular
                </button>
            </div>
        </form>
    )
}