// 1 завдання реалізація класу Worker та метод getSalery() зробити 2 обє'екта моє та мого товариша
class Worker{
    //2 завдання реалізація властивостей полів з private модифікатором та створення Get - гетерів
    #GetName;
    #GetSurname;
    #GetRate;
    #GetDays;
    #GetSalery;
    constructor(Name, Surname, Rate, Days) {
        //this.Name = Name;
        //this.Surname = Surname;
        //this.Rate = Rate;
        //this.Days = Days;
        // тут вставимо через конструктор поля приватні витягнемо через обєкти! 
        this.#GetName = Name;
        this.#GetSurname = Surname;
        this.#GetRate = Rate;
        this.#GetDays = Days;
    };
    GetSalery() {
        let FullSalery;
        return FullSalery = this.Rate * this.Days; 
    };

    get Name() {
        return this.#GetName;
    }

    get Surname() {
        return this.#GetSurname;
    }

    get Rate() {
        return this.#GetRate;
    }

    get Days() {
        return this.#GetDays;
    }

    get Salery() {
       return this.#GetSalery = this.GetSalery();
    }
    
    set NewRate(Rate) {
       let NewFullRate = Rate + this.#GetRate;
        return this.#GetRate = NewFullRate;
        
    }

    set NewDays(Days) {
        let NewFullDays = Days + this.#GetDays;
        return this.#GetDays = NewFullDays;
    }
};
const FunStartObjMeFriendZavd1 = () => {
    const workerIvan = new Worker('Ivan', 'Zaharchuk', 10, 31);
    console.log(workerIvan.Name, workerIvan.Surname, workerIvan.Rate, workerIvan.Days, workerIvan.GetSalery());
    const workerSasha = new Worker('Sasha', 'Melnik', 20, 31);
    console.log(workerSasha.Name, workerSasha.Surname, workerSasha.Rate, workerSasha.Days, workerSasha.GetSalery());
};
//FunStartObjMeFriendZavd1();
const FunStartObjMeFriendZavd2 = () => {
    const workerIvan = new Worker('Ivan', 'Zaharchuk', 20, 31);
    console.log(`${workerIvan.Name} ${workerIvan.Surname} ${workerIvan.Rate} ${workerIvan.Days} ${workerIvan.Salery}`);
    const workerSasha = new Worker('Sasha', 'Melnik', 30, 31);
    console.log(`${workerSasha.Name} ${workerSasha.Surname} ${workerSasha.Rate} ${workerSasha.Days} ${workerSasha.Salery}`);
};
//FunStartObjMeFriendZavd2();
const FunStartObjMeFriendZavd3 = () => {
    const workerIvan = new Worker('Ivan', 'Zaharchuk', 30, 21);
    workerIvan.NewRate = 10;
    workerIvan.NewDays = 10;
    console.log(workerIvan.Salery);
};
//FunStartObjMeFriendZavd3();
class MyString{
    reverse(Name, Surname) {
        const ConvertName = Name.split('').reverse().join('');
        const ConvertSurname = Surname.split('').reverse().join('');
        const FullName = `${ConvertName} ${ConvertSurname}`;
        return console.log(FullName);
    };
    unFirst(MyStr) {
        let NewStr = MyStr.charAt(0).toUpperCase() + MyStr.slice(1).toLowerCase();
        return console.log(NewStr);
    };
    ucWords(Str1, Str2, Str3) {
        const UpStr1 = Str1.charAt(0).toUpperCase() + Str1.slice(1).toLowerCase();
        const UpStr2 = Str2.charAt(0).toUpperCase() + Str2.slice(1).toLowerCase();
        const UpStr3 = Str3.charAt(0).toUpperCase() + Str3.slice(1).toLowerCase();
        const FullStr = `${UpStr1} ${UpStr2} ${UpStr3}`;
        return console.log(FullStr);
    };
};
const NewMission4 = () => {
    const MyExample = new MyString();
    MyExample.reverse('Ivan', 'Zakharchuk');
    MyExample.unFirst('abcdefghi');
    MyExample.ucWords('qwerty1', 'abcdf', 'zahar');
};
//NewMission4();
class Validator{
    isEmail(Email) {
        const CheckValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //шаблон регулярного виразу
        return console.log(CheckValidation.test(Email)); //Регулярний вираз який може повернути ture або false
    }
    isDomain(Domain) {
        const CheckDomain = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i; //шаблон регулярного виразу
        return console.log(CheckDomain.test(Domain));
    }
    isDate(Date) {
        const CheckDate = /^\d{4}-\d{2}-\d{2}$/; //шаблон регулярного виразу
        return console.log(CheckDate.test(Date));
    }
    isPhone(NumberPhone){
        const CheckPhone = /^\+?\d{1,3}[- ]?\d{2,4}[- ]?\d{3,4}$/;
        return console.log(CheckPhone.test(NumberPhone));
    }
}
const NewMission5 = () => {
    const validator = new Validator();
    validator.isEmail('zaharhukvanyagmailgmail.com');
    validator.isDomain('ukraina.ua');
    validator.isDate('2004-03-15');
    validator.isPhone('+3804644343');
};
NewMission5();