
window.addEventListener('load',()=>{
let options = {
    root: null,
    rootMargin: '0px',
    threshold: .05
  }
  
  let f=true;
  let d=document.getElementById('main');
  let p1=document.getElementById('Visible')
  let no_of_data=6;
  
  let callback = (entries, observer) => {
    
    entries.forEach(entry => {
        if(entry.isIntersecting && f)
        {
            
            f=false;
            p1.innerHTML='Loading....'
            fetch(`http://localhost:5000/${no_of_data}`).
            then((res)=>res.json()).
            then((res)=>{
                console.log(res)
                    
                    no_of_data+=6;
                    for(let i=0;i<res.length;i++)
                    {
                        if(res[i]===null)
                        {
                            p1.innerHTML='Done';
                            observer.unobserve(entry.target);
                            return;
                        }
                        let p=document.createElement('div');
                        p.setAttribute('class','product-card');
                       const id=
                                `
                                    <div class="product-tumb">
                                    <img src=${res[i].image} alt="" />
                                    </div>
                                    <div class="product-details">
                                    <div class="category-details">
                                        <span class="product-catagory">${res[i].category}</span>
                                        <span class="product-catagory"> Rating <span class="value">${res[i].rating.rate}</span></span>
                                    </div>
                                    <h4><a href="">${res[i].title}</a></h4>
                                    <p>${res[i].description}</p>
                                    <div class="product-bottom-details">
                                        <div class="product-price">${res[i].price}</div>
                                        <div class='btn'>Buy</div>
                                    </div>
                                    </div>
                                `;
                        p.innerHTML=id;
                        d.appendChild(p);
                    }
                    f=true;
            }).
            catch((err)=>console.log(err))
        }
    })
  }
  
let observer = new IntersectionObserver(callback, options);

observer.observe(document.getElementById('Visible'))
})