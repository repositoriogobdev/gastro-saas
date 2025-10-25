import React, { useState, useEffect } from 'react';
import { XIcon } from './Icons';

declare const confetti: any;

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  total: number;
  onConfirmOrder: (customer: {name: string, address: string}, paymentMethod: 'Cartão' | 'PIX') => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess, total, onConfirmOrder }) => {
  const [step, setStep] = useState<'customerInfo' | 'payment' | 'success'>('customerInfo');
  const [paymentMethod, setPaymentMethod] = useState<'Cartão' | 'PIX'>('Cartão');
  
  const [customer, setCustomer] = useState({ name: '', address: '' });
  const [cardDetails, setCardDetails] = useState({
      number: '4242 4242 4242 4242',
      name: 'João da Silva',
      expiry: '12/28',
      cvc: '123'
  });

  useEffect(() => {
    if (isOpen && step === 'success' && typeof confetti === 'function') {
        const duration = 2 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
  }, [step, isOpen]);


  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleFinalizeOrder = () => {
    onConfirmOrder(customer, paymentMethod);
    setStep('success');
  }

  const handleClose = () => {
      if (step === 'success') {
        onSuccess();
      }
      onClose();
      // Reset for next time
      setTimeout(() => {
        setStep('customerInfo');
        setCustomer({ name: '', address: '' });
        setPaymentMethod('Cartão');
      }, 300);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-secondary rounded-lg shadow-xl w-full max-w-md relative animate-fade-in-up">
        <button onClick={handleClose} className="absolute top-3 right-3 p-1 text-text-secondary hover:text-accent transition-colors z-10">
          <XIcon className="h-6 w-6" />
        </button>
        
        {step === 'customerInfo' && (
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-2 text-text-primary">Seus Dados</h2>
            <p className="text-text-secondary mb-6">Total do Pedido: <span className="text-highlight font-bold">R${total.toFixed(2).replace('.', ',')}</span></p>

            <form onSubmit={handleCustomerSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary">Nome Completo</label>
                  <input type="text" id="name" required value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} className="mt-1 block w-full bg-primary border-border rounded-md shadow-sm focus:ring-accent focus:border-accent" />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-text-secondary">Endereço</label>
                  <input type="text" id="address" required value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} className="mt-1 block w-full bg-primary border-border rounded-md shadow-sm focus:ring-accent focus:border-accent" />
                </div>
              </div>
              <button type="submit" className="w-full bg-accent text-white font-bold py-3 mt-8 rounded-lg text-lg hover:bg-highlight transition-colors">
                Continuar para Pagamento
              </button>
            </form>
          </div>
        )}

        {step === 'payment' && (
             <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4 text-text-primary">Escolha o Pagamento</h2>
                <div className="grid grid-cols-2 gap-2 mb-6 bg-primary p-1 rounded-lg">
                    <button onClick={() => setPaymentMethod('Cartão')} className={`px-4 py-2 rounded-md font-semibold text-sm transition-colors ${paymentMethod === 'Cartão' ? 'bg-secondary shadow' : 'text-text-secondary'}`}>Cartão de Crédito</button>
                    <button onClick={() => setPaymentMethod('PIX')} className={`px-4 py-2 rounded-md font-semibold text-sm transition-colors ${paymentMethod === 'PIX' ? 'bg-secondary shadow' : 'text-text-secondary'}`}>PIX</button>
                </div>

                {paymentMethod === 'Cartão' ? (
                    <div className="space-y-4">
                        <h3 className="font-semibold text-text-secondary">Dados do Cartão (Simulado)</h3>
                        <div>
                           <label htmlFor="cardNumber" className="block text-sm font-medium text-text-secondary">Número do Cartão</label>
                           <input type="text" id="cardNumber" value={cardDetails.number} onChange={e => setCardDetails({...cardDetails, number: e.target.value})} className="mt-1 block w-full bg-primary border-border rounded-md shadow-sm"/>
                        </div>
                        <div>
                           <label htmlFor="cardName" className="block text-sm font-medium text-text-secondary">Nome no Cartão</label>
                           <input type="text" id="cardName" value={cardDetails.name} onChange={e => setCardDetails({...cardDetails, name: e.target.value})} className="mt-1 block w-full bg-primary border-border rounded-md shadow-sm"/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                               <label htmlFor="cardExpiry" className="block text-sm font-medium text-text-secondary">Validade (MM/AA)</label>
                               <input type="text" id="cardExpiry" value={cardDetails.expiry} onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})} className="mt-1 block w-full bg-primary border-border rounded-md shadow-sm"/>
                           </div>
                            <div>
                               <label htmlFor="cardCvc" className="block text-sm font-medium text-text-secondary">CVC</label>
                               <input type="text" id="cardCvc" value={cardDetails.cvc} onChange={e => setCardDetails({...cardDetails, cvc: e.target.value})} className="mt-1 block w-full bg-primary border-border rounded-md shadow-sm"/>
                           </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <h3 className="font-semibold text-text-primary mb-2">Pague com PIX</h3>
                        <p className="text-sm text-text-secondary mb-4">Aponte a câmera do seu celular para o QR Code abaixo.</p>
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/pix-payment-${Date.now()}`} alt="QR Code PIX" className="mx-auto border-4 border-border rounded-lg"/>
                        <button className="mt-4 w-full bg-primary py-2 rounded-lg text-sm font-semibold border border-border hover:bg-border">Copiar Chave (Simulado)</button>
                    </div>
                )}
                 <button onClick={handleFinalizeOrder} className="w-full bg-accent text-white font-bold py-3 mt-8 rounded-lg text-lg hover:bg-highlight transition-colors">
                    Confirmar Pedido - R${total.toFixed(2).replace('.', ',')}
                </button>
            </div>
        )}

        {step === 'success' && (
          <div className="p-8 text-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold mb-2 text-text-primary">Pagamento Realizado com Sucesso!</h2>
            <p className="text-text-secondary mb-6">Seu pedido foi realizado. Agradecemos a sua preferência!</p>
            <button onClick={handleClose} className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-highlight transition-colors">
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;