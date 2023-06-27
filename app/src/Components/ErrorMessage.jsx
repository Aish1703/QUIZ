import React from 'react'
import { spacing, ThemingParameters } from "@ui5/webcomponents-react-base";


const ErrorMessage = ({children}) => {
  return (
    <div
    style={{width:'100%',
            ...spacing.sapUiLargePaddingBeginEnd,
        ...spacing.sapUiTinyMarginTopBottom,
    borderRadius:'4',
backgroundColor:'orangered',
textAlign:'center',
color:'white',
textTransform:'capitalize',
paddingTop:'5px', paddingBottom:'5px'}}>{children}</div>
  )
}

export default ErrorMessage