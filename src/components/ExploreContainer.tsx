import './ExploreContainer.css';
import {
  IonItem,
  IonInput,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonThumbnail,
  IonImg,
  IonButton
} from '@ionic/react';

import React from 'react'
import fetchJson from '../lib/fetchJson';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ }) => {
  const [text, setText] = React.useState("Cadastrar")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [id, setId] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [step, setStep] = React.useState("CADASTRO")


  const resetForm = () => {
    setStep("CADASTRO")
    setName("")
    setEmail("")
    setId("")
  }


  const submitRegister = async () => {
    try {
      setLoading(true)
      //call api
      let res = await fetchJson("https://t034xrowkk.execute-api.sa-east-1.amazonaws.com/dev/register", {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          name,
          email
        })
      })
      setId(res.id)
      console.log(res)
      setStep("CADASTRO_OK")
    }
    catch (err) {
      console.log(err)
      setStep("CADASTRO_ERRO")
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      {step === "CADASTRO" && (
        <>
          <IonCard>
            <IonCardHeader>
              {/* <IonImg src="assets/logo.png" alt="logo" /> */}
              {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          <IonCardTitle>Card Title</IonCardTitle> */}
            </IonCardHeader>

            <IonCardContent>
              Cadastre-se abaixo para ficar por dentro das novidades!!!!!!!!
            </IonCardContent>
          </IonCard>
          <IonItem>
            <IonLabel position="floating">Nome</IonLabel>

            <IonInput id="name" value={name} onIonChange={(e: any) => setName(e.target.value)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">E-mail</IonLabel>
            <IonInput id="email" value={email} onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
          </IonItem>
          <IonButton id="btn_register" expand="full" color="success" onClick={() => submitRegister()} disabled={loading}>{loading === true ? "Aguarde" : "Cadastrar"}</IonButton>
        </>
      )}

      {step === "CADASTRO_OK" && (
        <>
          <div><strong>Cadastro efetuado com sucesso</strong></div>
          <div style={{margin: '20px'}}>
            Id: {id}
          </div>
          <div style={{margin: '20px'}}>
            Nome: {name}
          </div>
          <div style={{margin: '20px'}}>
            E-mail: {email}
          </div>
         
          <IonButton id="btn_new_register" expand="full" color="success" onClick={() => resetForm()}>Novo Cadastro</IonButton>
        </>
      )}

      {step === "CADASTRO_ERRO" && (
        <>
          <strong>Erro ao cadastrar</strong>
          <IonButton id="btn_try_again" expand="full" onClick={() => resetForm()}>Tentar Novamente</IonButton>
        </>
      )}

    </div>
  );
};

export default ExploreContainer;
