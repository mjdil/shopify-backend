# Shopify Backend Challenge Documentation 

> Hello, welcome to my shopify challenge. In this lightweight API, I included multiple product queries, secure authorization, and a cart based checkout system


![](header.png)

## Setup

This api was hosted on a local machine, and also used a local DB server, however you can add your remote URL if you wish to change the DB into a remote one


## Secure Authorization 
First, lets start off with Security. I used Google OAuth for cookie authorization for this API. So if you got to  `/auth/google` you will be asked to login.

<img width="1140" alt="screen shot 2019-01-21 at 6 23 55 am" src="https://user-images.githubusercontent.com/36118498/51547300-fdb25900-1e33-11e9-9e61-1830efd6a94d.png">
 

signing in will re-direct you to `/api/signedin` , which will display your basic user object that entails of the relevant info for a specific user 

<img width="1141" alt="screen shot 2019-01-21 at 6 24 20 am" src="https://user-images.githubusercontent.com/36118498/51547402-33efd880-1e34-11e9-99ba-76b783f56cf1.png">
 

You can also go to `/api/currentuser` to essentially check weather you are logged in or not, if you are logged in you will see your googleId, else you will see `undefined`.

<img width="1149" alt="screen shot 2019-01-21 at 6 24 32 am" src="https://user-images.githubusercontent.com/36118498/51547429-4702a880-1e34-11e9-82d1-177aa1c86537.png">
 

Also if you want to end your session you can go to `api/logout` to logout

<img width="1139" alt="screen shot 2019-01-21 at 6 24 56 am" src="https://user-images.githubusercontent.com/36118498/51547454-571a8800-1e34-11e9-8581-622a1e376d1d.png">
 

## Product Queries 


Now if you go to `/products/yes`   (yes for is available -> inventory >0), you will see whatever inventory is in stock, currently its like this :

![screen shot 2019-01-22 at 1 37 11 am](https://user-images.githubusercontent.com/36118498/51547484-68fc2b00-1e34-11e9-85da-773da9f46bed.png)
 

Lets checkout `/products/no`

![screen shot 2019-01-22 at 1 36 55 am](https://user-images.githubusercontent.com/36118498/51547502-79aca100-1e34-11e9-8f2c-10e060cef0d4.png)
 


Now that we are signed in, lets do some Admin Tasks, firstly try adding products, I will add 2 types of products, with one of their inventory being 0. We make `POST` requests to `/products`, I am making these requests through the developer console on google chrome, and they can be seen, alongside their information on the right side of the image

![screen shot 2019-01-22 at 1 38 52 am](https://user-images.githubusercontent.com/36118498/51547552-88935380-1e34-11e9-9f8c-87f7c6f58902.png)



![screen shot 2019-01-22 at 1 39 54 am](https://user-images.githubusercontent.com/36118498/51547568-947f1580-1e34-11e9-99cc-64fee116e156.png)


Now lets check our inventory, and see if they showed up with the correct filter(which was if inventory > 0)

![screen shot 2019-01-22 at 1 40 10 am](https://user-images.githubusercontent.com/36118498/51547599-a496f500-1e34-11e9-89ed-20a50ab27d90.png)


![screen shot 2019-01-22 at 1 40 30 am](https://user-images.githubusercontent.com/36118498/51547612-a82a7c00-1e34-11e9-9a3c-5b679cd5be20.png)



Now lets try restocking an item by making a `POST` request to `/product/:id` we pass the update in the request body

![screen shot 2019-01-22 at 1 45 30 am](https://user-images.githubusercontent.com/36118498/51547678-c42e1d80-1e34-11e9-9222-44bfdef7b9da.png)


 

Now lets assert that it is actually restocked, by checking the products inventory 

![screen shot 2019-01-22 at 1 46 13 am](https://user-images.githubusercontent.com/36118498/51547684-c7290e00-1e34-11e9-9cdc-055e23ddce9b.png)


Now lets Try Deleting a product we can do this by making a `DELETE` request on `/product/:id` 

![screen shot 2019-01-22 at 1 47 09 am](https://user-images.githubusercontent.com/36118498/51547799-f93a7000-1e34-11e9-84ab-e07857155a6b.png)

 

Lets confirm that it was deleted by checking if its shown in the products inventory 

![screen shot 2019-01-22 at 1 47 23 am](https://user-images.githubusercontent.com/36118498/51547805-fccdf700-1e34-11e9-8002-33543b4593da.png)
 


Now everything makes sense, but I dont want a user to be able to add a product if he is not signed in. So lets logout and make sure a user cannot create a product if he is not signed in, and instead gets a `401` which I sent.


![screen shot 2019-01-22 at 1 54 24 am](https://user-images.githubusercontent.com/36118498/51547863-1c651f80-1e35-11e9-9735-d993fab84c34.png)



![screen shot 2019-01-22 at 1 55 01 am](https://user-images.githubusercontent.com/36118498/51547866-1f601000-1e35-11e9-961c-561194a50d88.png)


## Purchasing Products and Checkout

Okay so far so good, now lets move on to the consumer side. So far above we were testing admin specific tasks, but now lets try purchasing products, by adding them to a cart and checking out! 

Lets first make 2 requests to add different quantities of different items in our cart, this is done by making a `POST` request to `/product/:id/:amount`

![screen shot 2019-01-22 at 2 05 25 am](https://user-images.githubusercontent.com/36118498/51547977-51717200-1e35-11e9-872f-6aa223034618.png)



Looks good, now lets checkout these items, by simply making a `GET` request to  `/checkout`

![screen shot 2019-01-22 at 2 05 44 am](https://user-images.githubusercontent.com/36118498/51547986-559d8f80-1e35-11e9-8b43-379182c372c2.png)
 

Another feature of the shopping cart was that inventory was only decremented when a user did a checkout, lets confirm that 

![screen shot 2019-01-22 at 2 06 16 am](https://user-images.githubusercontent.com/36118498/51547993-59311680-1e35-11e9-9412-4e7080625be5.png)


makes sense :) 




Now I signed in with another user, and lets see what happens when he tries to place an item in his cart that has less inventory then he requested, in this case it is 0. 

![screen shot 2019-01-22 at 2 33 25 am](https://user-images.githubusercontent.com/36118498/51547999-5c2c0700-1e35-11e9-839f-9a677e7820a3.png)
 
Looks good, the 401 error that I send is received and he cannot add items to cart that are not in stock, which makes sense and completes the workflow!


## Conclusion

Hello, thanks so much for taking time out of your day to check the documentation, sorry if it wasnt the best documentation, (im a complete noob to writing README.md's), but anyway I hope you liked the Shopify Backend API that I created :)

