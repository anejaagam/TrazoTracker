import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './navigation/navigation';
import { Amplify } from 'aws-amplify';

import outputs from "./amplify_outputs.json";
import { Authenticator, useTheme, View, Image, Heading, useAuthenticator, Button , Theme, ThemeProvider, CheckboxField, Input, Placeholder, Label, Message} from '@aws-amplify/ui-react'; // Import the Image component
import '@aws-amplify/ui-react/styles.css';
import { SignUp } from '@aws-amplify/ui-react/dist/types/components/Authenticator/SignUp';
import { TrazoBackendProvider } from './utilities/trazoBackend';

Amplify.configure(outputs);

function App() {
  const { tokens } = useTheme();
  const Customtheme: Theme = {
    name: 'Auth Example Theme',
    
    tokens: {
      components: {
        authenticator: {
          router: {
            boxShadow: `0 0 16px ${tokens.colors.overlay['10']}`,
            borderWidth: '0',
          },
          form: {
            padding: `${tokens.space.medium} ${tokens.space.xl} ${tokens.space.medium}`,
          },
        },
        button: {
          primary: {
            backgroundColor: tokens.colors.green['60'],
          },
          link: {
            color: tokens.colors.green['100'],
          },
        },
        
        tabs: {
          item: {
            color: tokens.colors.green['80'],
            _active: {
              borderColor: tokens.colors.green['60'],
              color: tokens.colors.green['100'],
            },
          },
        },
        
      },
    },
  };

  const components = {
    Header() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.xxl}>
          <Image // Use the Image component correctly
            alt="Amplify logo" src={require('./assets/logo.svg').default}// Use the correct path to the logo
          />
        </View>
      );
    },
    SignIn: {
      
    },
    SignUp: {
      FormFields() {
        const { validationErrors } = useAuthenticator();

        return (
          <>
       
            <Authenticator.SignUp.FormFields />
            {Array.isArray(validationErrors) && validationErrors.length > 1 && (
      <Message colorTheme='error' heading="Error">
        {validationErrors.map((error, index) => (
          <div key={index}>{error.message}</div>
        ))}
      </Message>
    )}
    {!Array.isArray(validationErrors) && validationErrors.message && (
      <Message colorTheme='error' heading="Error">
        <div>{validationErrors.message}</div>
      </Message>
    )}
           

            
          </>
        );
      },
    },
   
   

  
  }  
  const formFields = {
    signUp: {
      email: {
        order: 2
      },
      password: {
        order: 3
      },
      confirm_password: {
        order: 4
      },
      'name': {
        order: 1
      }
    },
  }


  return (
   
<ThemeProvider theme={Customtheme}>
    <Authenticator formFields={formFields} components={components} services={
     {
      async validateCustomSignUp({ email }) {
        const emailPattern = /[A-Za-z]+@infinitygreen\.ca/i;
        if (!emailPattern.test(email)) {
            throw new Error("Email must be from infinitygreen.ca");
           
            
         
        }
      }
     }

     }
     >
      <TrazoBackendProvider>
    <Navigation />
    </TrazoBackendProvider>
    </Authenticator>
    </ThemeProvider>
    
  );
}

export default App;
