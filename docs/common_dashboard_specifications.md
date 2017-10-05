# Common dashboard specifications

## Board analytics

```/boards/:boardId/analytics/users```
*All users with operations on the boards (moved lists, moved cards, comments), Notifications (with creationDate and readDate)*

=> Most active user in the board
=> User with the most response time
=> MVP of the board
=> Less active user of the board
=> User with the largest amount of comment

```/boards/:boardId/analytics/cards```
*All cards with creator, assigned users, doneDate, dueDate (for each card, timestamps of move history, comments), labels*

=> Number of cards
=> Number of cards done in time
=> Number of cards done late
=> Number of cards done late per user
=> Average time spent in a list for a task
=> Average time spent in a list for a task per label
=> Average time spent in a list for a task per user
=> Average time spent in a list for a task per creator
=> Most moved card
=> Move moved label
=> Average number of comment
=> Most notified user

```/boards/:boardId/analytics/lists```
*All lists with all list history (for each history, timestamps, user)*

=> Most occupied lists (with most tasks)
=> Most active user per list
=> List with most comments

