
export const sortTable= (sortedData)=>{
    
    return sortedData.sort((a, b) => a.cases > b.cases? -1:1 );
 
  
  }