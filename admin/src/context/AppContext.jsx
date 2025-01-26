import { createContext } from "react";

export const AppContext= createContext()
const AppContextProvider=(props)=>{

    {/* const calculateAge = (dob) => {
        const today = new Date();
    
        
        const [year, month, day] = dob.split('-').map(Number);
    
        
        const birthDate = new Date(year, month - 1, day);
    
        
        let age = today.getFullYear() - birthDate.getFullYear();
    
        
        const hasBirthdayPassed = 
            today.getMonth() > birthDate.getMonth() || 
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
    
        if (!hasBirthdayPassed) {
            age--;
        }
    
        return age;
    };
    */}
    const value={
        //calculateAge,
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider