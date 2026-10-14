export const logoutUser=async()=>{
    const response=await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,{
            method:"POST",
            credentials:"include",
        }
    )
    if(!response.ok){
        throw new Error("Logout failed");
    }
    return response.json();
}
