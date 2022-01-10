const weather=(()=>{
    const overlay=document.querySelector("#overlay")
    const btn=document.querySelector('button')
    const srch=document.querySelector('input[name="rye"]')
    const name=document.querySelector("#name")
    const errata=document.querySelector("#error")
    const temp=document.querySelector("#temp")
    const humidity=document.querySelector("#humidity")
    const regex=/^[a-zA-Z]+\s?[a-zA-Z]+$/g
    const loading=()=>{
        overlay.classList.toggle("dark");
        overlay.textContent=overlay.classList.contains('dark')?"Loading":"";
    }
    const ask=()=>{
        //might want to test if prompt matches possible cities
        //forecast stuff
        let location=srch.value.toLowerCase()
        console.log(location.match(regex).join(""))
        if(!regex.test(location)){
            errata.textContent="Not valid, you cheeky bugger"
            return;
        }
        // while(!regex.test(location)){
        //     location=prompt("Enter City: ").toLowerCase()
        // }
        srch.value=""
        // let process=location.match(regex).join("")
        return data(location)
    }
    const data=async(location)=>{
        loading()
        try{
            errata.textContent=""
            let bigData=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=d75c00f00c202fa5d54e07ec3619429f`,
            {mode:'cors'});
            bigData=await bigData.json();
            console.log(bigData);
            name.innerHTML=`City,Country<br>${bigData.name},${bigData.sys.country}`
            temp.innerHTML=`Temperature Celsius<br>${bigData.main.temp}`
            humidity.innerHTML=`Humidity<br>${bigData.main.humidity}%`
        }
        catch(error){
            errata.textContent="Search must be in the form of 'City', 'City, State' or 'City, Country'."
            // console.error("why mate?",error)
        }
        loading()
    }
    data("Benghazi")
    btn.addEventListener('click',()=>{
        errata.textContent=""
        ask()
    })
    return {ask}
})()
