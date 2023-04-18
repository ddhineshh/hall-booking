import express from "express";
const app = express();

app.use(express.json())


//Data
const hall = [
    {
        name:'Normal',
        seat:'100',
        features:'AC, Television, Hot water, WiFi',
        price:'4000',
        id:'10040001',
        bookedDetails:[
            {
                name:'Dhinesh',
                date:'18.04.2023',
                start:'10.00',
                end:'18.00',
                status:'confirmed'
            }
        ]
    },
    {
        name:'Luxury',
        seat:'40',
        features:'AC, Television, Hot water, WiFi, BreakFast Free, Servent, Room Assitance, Drinks',
        price:'8000',
        id:'4080002',
        bookedDetails:[
            {
                name:'Kumaresh',
                date:'18.04.2023',
                start:'14.00',
                end:'23.00',
                status:'confirmed'
            }
        ]
    }
]

//Calling API 

app.get('/',(req,res)=>{
    res.status(200).send('Server is running succesfully')
});

//Creating Hall

app.post('/create-hall',(req,res)=>{
    hall.push({
        name:req.body.name,
        seat:req.body.seat,
        features:req.body.features,
        price:req.body.price,
        id:`${req.body.seat}${req.body.price}${hall.length+1}`,
        bookedDetails:[{}]
    })
    res.send(hall)
})

//Book Hall

app.post('/book-room',(req,res)=>{
    for(let i=0; i < hall.length; i++){
        console.log('a');
        if(!(hall[i].id === req.body.id)){
            return res.status(400).send({error:'Invalid'})
        }
        else{
            let booking = {
                customer_name:req.body.name,
                date:new Date(req.body.date),
                start:req.body.start,
                end:req.body.end,
                status:'confirmed'
            }
            let result = undefined;
            hall[i].bookedDetails.forEach((book)=>{
                if(
                    book.date.getTime() == booking.date.getTime() &&
                    book.start === booking.start
                ){
                    result = 0;
                    console.log('in booking');
                }
                else{
                    result = 1;
                    hall[i].bookedDetails.push(booking)
                }
            })
            if(result) return res.status(200).send('Booking Confirmed')
            else 
            return res
            .status(400)
            .send({error:'Please select different time slot'})
        }
    }
})

app.get('/list-customer',(req,res)=>{
    let customer_list = []

    hall.forEach((hall)=>{
        let customer_det = {hall_name:hall.name}

        hall.bookedDetails.forEach((customer)=>{
            customer_det.customer_name=customer.customer_name;
            customer_det.date=customer.date;
            customer_det.start=customer.start;
            customer_det.end=customer.end;
            customer_list.push(customer_det)
        })
    })
    res.send(customer_list)
})

app.get('/booked-rooms',(req,res)=>{
    console.log('list rooms');
    res.status(200).send(hall)
})

app.get('/',(req,res)=>{
    console.log('server is running successfully');
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
