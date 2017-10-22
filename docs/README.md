# Dashboard Analytics Prerequisite
:::info
Soon with previews and more described routes
:::

 ## Graphics

  ### ++Sum graphics++
  
   #### On Cards
*   Number of cards for a list per day/week/month/year/total
*   Number of cards per list per day/week/month/total
*   Number of cards with due date completed/not completed in time
*   Number of archived cards
*   Number of cards done in time by users
*   Number of cards done in time by owners
*   Number of cards done in time by labels


  ### ++Average time graphics++
  
   #### Notifications (negotiable)
*   Average time for a notification to be read. General granularity and per collaborator

   #### Cards
   *   Average time for a card with due date to be completed per list/tag/collaborator

  ### ++Ratio graphics++
  
   #### Cards

   *   $$\frac{\text{nb of cards with due date completed (or not) in time}}{\text {nb of cardswith due date completed}}\space\text{per user (or not)}$$ 



   
 ## Database attributes required

  ### User
```javascript
"boards": Board[] //The boards the user has created or is a collaborator of
```

  ### Board
```javascript
"title": String //The title of the board
"collaborators": User[] //The collaborators of the project
"createdAt": Date //The date the board was created at
"lists": List[] //The lists the board contains


```

  ### List
```javascript
"name": String //The name of the list
"cards": Card[] //The cards the list contains
"isArchived": Boolean //True if the list is archived

```

  ### Card
```javascript
"withDueDate": Boolean //False if dueDate===null
"dueDate": [Date;default=null] //The due date of the card
"createdAt": Date //The date the card was created at
"completedAt": [Date;default=null] //The date the card was completed at
"assignedUsers": User[] //The users assigned to the card
```

  ### Notification (negotiable)
```javascript
"createdAt": Date //The date the notification was createdAt
"isSeen": Boolean //True if the user has seen the notification once
"seenAt": Date //The date the notification was seen at for the first time
"receiver": User.id //The id of the user receiving the notification
"board": Board.id //The id of the board emitting the notification
```

 ## Routes
 ### Base URL :  /analytics
 #### ++Sum URL : /analytics/sum++
 
 **GET** /boards/:id/cardsCompleted
 *Returns the number of completed cards for a specific board*
> *    Parameters
>         id: [integer]
> :::success
>  * Success reponse
>         200: OK
>         **content:** 
>     ```javascript
>     {
>         "value": [integer]
>     }
>     ```
> :::
> :::danger
>  * Error response
>     401: Unauthorized
>     **content:**
>     ```javascript
>     {
>         "error": [text]
>     }
>     ```
> :::


 **GET** /boards/:board_id/lists//total-cards/:day?:week?:month?:year
 *Number of cards for lists per day/week/month/year*
> 
>  *   Parameters
>          board_id: [integer]
> :::success
>  * Success response
>          status: 200 OK
>          **content:**
>```javascript
>{
>  day: 1
>  lists: [
>     {list: "Product Backlog", cards: 45},
>     {list: "Spring planning", cards: 10},
>     {list: "Todo", cards: 5},
>     {list: "WIP", cards: 3},
>     {list: "Review", cards: 1}
>     ]
>  month: null
>  year: null
>}
>```
> :::
> * Charts (ex: Day 1, Week 1, September, 2017)
> ![](https://i.imgur.com/quSZ8cW.png)
> ![](https://i.imgur.com/o1CgDxI.png)
> ![](https://i.imgur.com/XlsscCu.png)
> ![](https://i.imgur.com/OFc7zzl.png)






 **GET** /boards/:board_id/archived-cards
 *Number of archived cards*
 
>  *   Parameters
>         board_id: [integer]
> 
>:::success
>  *   Success response
>         status: 200 OK
>         **content:**
> 
> ```javascript
> {
>      "value": [integer]
> }
> ```
> 
>:::

 **GET** /boards/:board_id/cards-by-user
 *Number of cards done in time by user*
 
>  *   Parameters
>         board_id: [integer]
> 
>:::success
>  *   Success response
>         status: 200 OK
>         **content:**
> 
> ```javascript
> {
>      {username: "John", doneInTime: 15, notDoneInTime: 8},
>      {username: "Maria", doneInTime: 8, notDoneInTime: 7}      
> 
>
> }
> ```
> 
>:::
>*    Chart
>![](https://i.imgur.com/EvUIl2l.png)

 **GET** /boards/:board_id/cards-by-owner
 *Number of cards done in time by owner*
 
>  *   Parameters
>         board_id: [integer]
> 
>:::success
>  *   Success response
>         status: 200 OK
>         **content:**
> 
> ```javascript
> {
>      {username: "John", doneInTime: 15, notDoneInTime: 8},
>      {username: "Maria", doneInTime: 8, notDoneInTime: 7},
>      {username: "Roberto", doneInTime: 30, notDoneInTime: 1}      
> 
>
> }
> ```
> 
>:::
>* Chart
>![](https://i.imgur.com/QHm1Si0.png)


 **GET** /boards/:board_id/cards-by-label
 *Number of cards done in time by label*
 
>  *   Parameters
>         board_id: [integer]
> 
>:::success
>  *   Success response
>         status: 200 OK
>         **content:**
> 
> ```javascript
> {
>      {label: "Front-end", doneInTime: 15, notDoneInTime: 5},
>      {label: "Back-end", doneInTime: 6, notDoneInTime: 3},
>      {label: "Documentation", doneInTime: 20, notDoneInTime: 12},
>      {label: "Review", doneInTime: 3, notDoneInTime: 5},
>      {label: "Test", doneInTime: 2, notDoneInTime: 12}      
> 
>
> }
> ```
> 
>:::
>* Chart
>![](https://i.imgur.com/0AhJkqS.png)



 #### ++Average time URL : /analytics/ratio++
 
 **GET** /boards/:id/cards-completed
  *Average time for a card with due date to be completed per list/tag/collaborator*
 
>  *   Parameters
>         board_id: [integer]
> 
>:::success
>  *   Success response
>         status: 200 OK
>         **content:**
> 
> ```javascript
> {
>      "value": [integer]
> }
> ```
> 
>:::
 
 
 #### ++Ratio URL : /analytics/ratio/++
 
 **GET** /boards/:board_id/users/:user_id/cards-completed
   *$$\frac{\text{nb of cards with due date completed (or not) in time}}{\text {nb of cardswith due date completed}}\space\text{per user (or not)}$$*
 
>  *   Parameters
>         board_id: [integer]
> 
>:::success
>  *   Success response
>         status: 200 OK
>         **content:**
> 
> ```javascript
> {
>      doneInTime: 18,
>      notDoneInTime: 12
> }
> ```
> 
>:::
>* Chart
>![](https://i.imgur.com/8pk13T0.png)

 
 
 
 

 
