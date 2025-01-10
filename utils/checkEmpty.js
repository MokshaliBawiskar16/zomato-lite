const vlaidator =require("validator")
//                    👇object eg {mobile,address,city,type,startTime,endTime}
exports.checkEmpty=(config)=>{
    let isError =false
    const error=[]
for (const key in config) {
   if (vlaidator.isEmpty( config[key] ?config[key]:" ")) { //isEmpty(config.mobile) isEmpty(config.address)
    //                                              👆ye isliye kiya q k validator string leta hai undefine 
    //                                               aaya to error leta hai to key nhi mile to usko
    //                                                 string bhejna hai bolk " "empty string ki condition lagai 
    isError=true
    error.push(`${key} is require`)
   }
    
}
return {isError,error}
}