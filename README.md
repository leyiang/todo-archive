# Life App - the todo part.

## Features

## List
- List
    - name
    - baseTask[]
    - orderNumber=10
    - filterOptions
        - today
        - isImportant
        - hasTag
- Normal List
    - Tasks Created By User
- Dynamic List
    - Task inserted automatically by filter options
    - My Day, Importnant, Books, etc

## Task
- Base Task
    - Name
    - Finish Status
    - Plan Date
    - Rank, Importance, Priority
    - BelongsTo (List, Task)
    - parent_id
- Detailed Task (extends Base Task)
    - Important Status
    - Subtasks
    - description
    - Due Date
