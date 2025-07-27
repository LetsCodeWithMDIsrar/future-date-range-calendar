import React from "react"
import { Text } from "react-native"

type CustomTextTypes = {
    value:string
    size:number
    textStyle?:any
}
const CustomText = (props:CustomTextTypes)=>{
    return (
        <Text style={[props?.size && {fontSize:props?.size}, props?.textStyle]}>{props?.value}</Text>
    )
}

export default CustomText