import { useState } from 'react'
import HelpButton from '../components/HelpButton.jsx'
import StepIndicator from '../components/purchase/StepIndicator.jsx'
import StepEvent from '../components/purchase/StepEvent.jsx'
import StepBuyer from '../components/purchase/StepBuyer.jsx'
import StepPayment from '../components/purchase/StepPayment.jsx'
import StepConfirmation from '../components/purchase/StepConfirmation.jsx'
import { EVENTS, MOCK_BUYER_DEFAULTS, generateTicketId } from '../data/mockData.js'

const HELP_TEXT = {
  1: 'Passo 1: o cliente escolhe o jogo e a categoria de bilhete (Geral, VIP ou Camarote).',
  2: 'Passo 2: recolha dos dados do comprador para envio do bilhete digital.',
  3: 'Passo 3: pagamento simulado via M-Pesa, e-Mola ou mKesh, com prompt USSD ilustrativo.',
  4: 'Passo 4: bilhete emitido com QR code único, enviado por WhatsApp e email.',
}

export default function Purchase() {
  const [step, setStep] = useState(1)
  const [eventId, setEventId] = useState(EVENTS[0].id)
  const [categoryId, setCategoryId] = useState('geral')
  const [methodId, setMethodId] = useState('mpesa')
  const [buyer, setBuyer] = useState(MOCK_BUYER_DEFAULTS)
  const [ticketId, setTicketId] = useState('')

  const goNext = () => setStep((s) => Math.min(s + 1, 4))
  const goBack = () => setStep((s) => Math.max(s - 1, 1))

  const handlePaid = () => {
    setTicketId(generateTicketId())
    goNext()
  }

  return (
    <div className="max-w-5xl mx-auto px-6 pt-12 pb-28">
      <StepIndicator current={step} />

      {step === 1 && (
        <StepEvent
          eventId={eventId}
          categoryId={categoryId}
          onSelectEvent={setEventId}
          onSelectCategory={setCategoryId}
          onNext={goNext}
        />
      )}
      {step === 2 && (
        <StepBuyer buyer={buyer} onChange={setBuyer} onNext={goNext} onBack={goBack} />
      )}
      {step === 3 && (
        <StepPayment
          methodId={methodId}
          onSelectMethod={setMethodId}
          categoryId={categoryId}
          onBack={goBack}
          onPaid={handlePaid}
        />
      )}
      {step === 4 && (
        <StepConfirmation
          eventId={eventId}
          categoryId={categoryId}
          buyer={buyer}
          ticketId={ticketId}
        />
      )}

      <HelpButton text={HELP_TEXT[step]} />
    </div>
  )
}
