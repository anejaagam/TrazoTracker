import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './navigation/navigation';
import { Amplify } from 'aws-amplify';


import { Authenticator, useTheme, View, Image, Heading, useAuthenticator, Button , Theme, ThemeProvider} from '@aws-amplify/ui-react'; // Import the Image component
import '@aws-amplify/ui-react/styles.css';



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
  
  }  
  const formFields = {
    signUp: {
      email: {
        order:2
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
    <Authenticator formFields={formFields} components={components} >
    <Navigation />
    </Authenticator>
    </ThemeProvider>
    
  );
}

export default App;
