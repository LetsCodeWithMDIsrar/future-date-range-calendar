import React from 'react'
import { Image, StyleSheet } from "react-native"
import { colors } from "../../utils"

export const LeftChevron = ()=>{
    return (
        <Image source={require("./left-chevron.png")} style={styles.iconStyle}/>
    )
}

const styles = StyleSheet.create({
    iconStyle:{
        tintColor:colors.primary,
        height:30,
        width:30,
    }
})