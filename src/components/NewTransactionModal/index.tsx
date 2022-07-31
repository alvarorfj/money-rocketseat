import { FormEvent, useContext, useState } from 'react';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import Modal from 'react-modal'
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const { createTransaction} = useTransactions()
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState("deposit")
    const [category, setCategory] = useState('');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
        await createTransaction({
            title: title,
            amount: amount,
            category: category,
            type: type
        });
        
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit')

        onRequestClose();
    }

    return (
        <Modal 
          isOpen={isOpen} 
          onRequestClose={onRequestClose}
          overlayClassName="react-modal-overlay"
          className="react-modal-content"
          >
            <button type="button" className='react-modal-close' onClick={onRequestClose}>
                <img src={closeImg} alt="Fechar modal"/>
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>
                <input type="text" placeholder='Título' 
                onChange={(event) => { setTitle(event.target.value)}}/>
                <input type="number" placeholder='Valor'
                onChange={(event) => { setAmount(Number(event.target.value))}}/>

                <TransactionTypeContainer>
                    <RadioBox 
                        type="button"
                        onClick={() => setType('deposit')}
                        isActive={type === 'deposit'}
                        activeColor="green"
                        >
                            <img src={incomeImg} alt="Entrada" />
                            <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                        >
                            <img src={outcomeImg} alt="Saida" />
                            <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input type="text" placeholder='Categoria'
                onChange={(event) => { setCategory(event.target.value)}}/>
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}