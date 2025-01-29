Бекенд до інтернет магазину.

1. User:
1. https://my-market-node.onrender.com/api/auth/register | POST. {name(min:3), email(example@mail.com), password(min:3)};
1. https://my-market-node.onrender.com/api/auth/login | POST. {email(example@mail.com), password(min:3)};
1. https://my-market-node.onrender.com/api/auth/current | GET.
1. https://my-market-node.onrender.com/api/auth/logout | POST.

1. Order:
1. https://my-market-node.onrender.com/api/orders | GET. Адмін має доступ до всіх. Кожен юзер має тільки свої. Є пагінація 10 на сторінку.
1. https://my-market-node.onrender.com/api/orders/:id | GET. Шукає одну книгу по id.
1. https://my-market-node.onrender.com/api/orders | POST. Створення замовлення. {name(min:3), phone(format:0970000000), items(min:1)[{name:string, quantity:number, price:number} ]}
1. https://my-market-node.onrender.com/api/orders/:id | PUT. Корекція замовлення. {name(min:3), phone(format:0970000000), items(min:1)[{name:string, quantity:number, price:number} ]}
1. https://my-market-node.onrender.com/api/orders/:id/status | PATCH. Обновляє поле status. {status:string("new", "pending", "completed", "canceled")}
1. https://my-market-node.onrender.com/api/orders/:id | DELETE.

Є, локальний, код створення адміна!
