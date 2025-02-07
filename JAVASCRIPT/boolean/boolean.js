import bcrypt from 'bcrypt'

function verifyPassword(password, hashedPassword){
    if (bcrypt.compare(password,hashedPassword) == true){
        return true
    }else{
        return false
    }
   
}
function verifyMFA(inputMFA,correctMFA){
    if(inputMFA === correctMFA){
        return true
    }else{
        return false
    }
}

function checkBalance(balance,withdrawalAmount){
    if (balance > withdrawalAmount){
        return true
    }
    else{
        return false
    }
} 

function checkDailyLimit(withdrawalAmount,dailyLimit){
    if(withdrawalAmount <dailyLimit){
        return true
    }else{
        return false
    }

}
function processWithdrawal(user,password,inputMFA,balance,withdrawalAmount){
    if (verifyPassword(password,user.hashedPassword) == false)
        return "Transaction Failed: Incorrect password"

    if(verifyMFA(inputMFA,user.correctMFA) == false)
      return "Transaction Failed: Incorrect MFA"

    if(checkBalance(balance,user.withdrawalAmount) == false)
        return "Transaction Failed:Insufficient balance"
    if(checkDailyLimit(withdrawalAmount,user.dailyLimit) == false)
        return "Transaction Failed:Amount exceeds daily limit."
    user.balance -=withdrawalAmount
    return "Transaction Successful! New Balance:" +user.balance
}

//1) Why is it important to store passwords in a hashed format? What security
// advantage does this provide over plain text passwords?
//Answer- Using hashed format encrypts the password when its in the database hence noone can view it and access the system.


// 3)How does implementing MFA enhance the security of the transaction process?
// What types of attacks does it help prevent?
//MFA enhances security by going further than just the password since someone can access the password.
//the types of attacks it prevents include Brute Force and phishing attacks


// 4)What purpose does the daily transaction limit serve? How does it help in
//preventing fraudulent or excessive withdrawals?
//Daily transaction limit prevents one from over withdrawing money from the account.
//this prevents one from withdrawing money yet they have a negative in their account.

//If you were to add extra features, such as fraud detection (e.g., detecting
//abnormal withdrawal patterns), how would you go about doing this? What
//additional data would you track to detect fraud?
//To detect fraudulent withdrawals, I would track transaction patterns, geolocation, and device data, using rule-based thresholds and machine learning models for anomaly detection. Suspicious activity would trigger alerts, extra authentication, or transaction blocks, ensuring security through data analytics and AI-driven fraud prevention