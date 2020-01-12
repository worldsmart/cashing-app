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
      - Success
        - token: string - токен пользователя, для дальнейшего использования приложения
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
   
 PUT /user/autorization - для добавления или удаления пользователей
  - Input
     - Body
      - username: string - юзернейм от аккаунта
      - password: string - пароль от аккаунта
   - Output
      - Success
        - token: string - токен пользователя, для дальнейшего использования приложения
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
  
  GET /user/list - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
      - Success
        - token: string - токен пользователя, для дальнейшего использования приложения
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
   
   
   
  PUT /product - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
      - Success
        - token: string - токен пользователя, для дальнейшего использования приложения
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
   
  PUT /product/list - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
      - Success
        - token: string - токен пользователя, для дальнейшего использования приложения
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
   
   
   
   PUT /order/create - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
      - Success
        - token: string - токен пользователя, для дальнейшего использования приложения
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
   
  PUT /order/receipt - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
      - Success
        - token: string - токен пользователя, для дальнейшего использования приложения
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
  
  PUT /order/invoice - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
      - Success
        - token: string - токен пользователя, для дальнейшего использования приложения
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
  
  PUT /order/confirm - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
      - Success
        - token: string - токен пользователя, для дальнейшего использования приложения
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
  
  PUT /order/list - для добавления или удаления пользователей
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
   - Output
      - Success
        - token: string - токен пользователя, для дальнейшего использования приложения
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
