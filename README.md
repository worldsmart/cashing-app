Инструкции по запуску:
  - Запуск через Docker:
    -  Из корневой папки приложения вызвать команду "npm run docker"
  - Запуск через npm:
    - Установить необходимые модули командой "npm install"
    - Указать параметры для подключения к базе данных PostgreSQL в файле "config.json"
    - Запустить приложение командой "npm start"
  - Запуск тестов: 
    - Тесты запускаются командой "npm test"
    
 
 
 Точки входа приложения:
 
 
 
 PUT /user - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
   
 PUT /user/autorization - для добавления или удаления пользователей
  - Input
     - Body
   - Output
  
  PUT /user/list - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
   
   
   
  PUT /product - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
   
  PUT /product/list - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
   
   
   
   PUT /order/create - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
   
  PUT /order/receipt - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
  
  PUT /order/invoice - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
  
  PUT /order/confirm - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
  
  PUT /order/list - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
