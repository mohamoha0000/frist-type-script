function istamatol(word:string) : boolean{
    let w1=word.slice(0,word.length/2);
    let w2;
    if(word.length%2===0){
        w2=word.slice((word.length/2),word.length)
    }else{
        w2=word.slice((word.length/2)+1,word.length)
    }

    return w2.split("").reverse().join("") === w1;
}

console.log(istamatol("123456654321"));