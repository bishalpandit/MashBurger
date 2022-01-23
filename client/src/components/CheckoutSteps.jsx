import React from 'react'
import { Step, Stepper, Box, Typography, Button, StepLabel } from '@mui/material'

const steps = ['Sign In', 'Shipping', 'Payment', 'Place Order'];

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
 
    return (

            <Stepper sx={{ width: '60%', mx: 'auto', my: '2rem' }}>
                {step1 ? (<Step completed={true}>
                    <StepLabel>Sign In</StepLabel>
                </Step>)
                    :
                    (<Step disabled={true}>
                        <StepLabel>Sign In</StepLabel>
                    </Step>)
                }
                {step2 ? (<Step completed={true}>
                    <StepLabel>Shipping Address</StepLabel>
                </Step>)
                    :
                    (<Step disabled={true}>
                        <StepLabel >Shipping Address</StepLabel>
                    </Step>)
                }
                {step3 ? (<Step completed={true}>
                    <StepLabel>Payment Details</StepLabel>
                </Step>)
                    :
                    (<Step disabled={true}>
                        <StepLabel>Payment Details</StepLabel>
                    </Step>)
                }
                {step4 ? (<Step completed={true}>
                    <StepLabel>Place Order</StepLabel>
                </Step>)
                    :
                    (<Step disabled={true}>
                        <StepLabel>Place Order</StepLabel>
                    </Step>)
                }
            </Stepper>
    )
}

export default CheckoutSteps
