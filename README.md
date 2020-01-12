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
 
 
 
 PUT /user - для добавления или удаления пользователей (только для Менеджеров)
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
        - operation: ['add', 'remove'] - указывает выполняемую операцию
        - remove: id: int - id удаляемого пользователя
        - add: name: string - имя владельца аккаута
        - add: phone: string - телефон владельца аккаунта
        - add: username: string - будущий юзернейм для входа
        - add: password: string - пароль для входа
        - add: role: string - роль пользователя
   - Output
      - Success
        - msg: string - сообщение о успехе операции
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
   
 PUT /user/autorization - для авторизации пользователя
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
  
  GET /user/list - для получения списка пользователей (только для Менеджеров)
  - Input
     - Headers
       - Authorization: string - authorization token
   - Output
      - Success
        - array - массив пользователей
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
   
   
   
  PUT /product - для добавления или удаления продуктов (только для Менеджеров)
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
        - operation: ['add', 'remove'] - указывает выполняемую операцию
        - add: name: string - имя добавляемого продукта
        - add: price: double - цена добавляемого товара
        - remove: id: int - id удаляемого товара
   - Output
      - Success
        - msg: string - сообщение о успехе операции
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
   
  GET /product/list - для получения списка продуктов
  - Input
     - Headers
       - Authorization: string - authorization token
   - Output
      - Success
        - array - массив содержащий список существующих продуктов
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
   
   
   
   PUT /order/create - для добавления заказа (только для Кассиров)
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
        - product_id: int - id заказываемого продукта
        - customer: string - идинтефикационные данные покупателя
   - Output
      - Success
        - msg: string - текст сообщающий о успехе операции
        - order: object - обект заказа с id и прочим
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
   
  PUT /order/receipt - для подтверждения получения заказа (только для Консультантов)
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
        - id: int - номер полученого заказа
   - Output
      - Success
        - msg: string - текст сообщающий о успехе операции
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
  
  PUT /order/invoice - для генерации счета по заказу (только для Кассиров)
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
        - id: int - id заказа для генерации чека
   - Output
      - Success
        - order: object - обект с данными о заказе, стоимости и.т.д.
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
  
  PUT /order/confirm - для подтверждения оплаты заказа (только для Кассиров)
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body
         - id: int - id заказа для подтверждения оплаты
   - Output
      - Success
        - msg: string - текст сообщающий о успехе операции
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
  
  PUT /order/list - для получения списка заказов (только для Менеджеров)
  - Input
     - Headers
       - Authorization: string - authorization token
     - Body(unrequered)
        - from: string(date format YYYY-MM-DD) - дата от которой будут выведены заказы
        - to: string(date format YYYY-MM-DD) - дата до которой будут выведены заказы
   - Output
      - Success
        - array - массив содержащий список заказов
      - Error
        - text: string - текст ошибки
        - code: int - код ошибки
