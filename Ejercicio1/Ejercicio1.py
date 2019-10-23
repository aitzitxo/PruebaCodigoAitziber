def func_type_number(value):

    array_values =[]
    for x in range(1,int(value/2)+1,1):
        if (value/x).is_integer():
            array_values.append(x)

    suma = sum(array_values)

    if suma == value: 
        return "perfecto"
    elif suma < value :
        return "defectivo"
    else :
        return "abundante"

def func_type_number2(value):

    array_values =[x  for x in range(1,int(value/2)+1,1) if (value/x).is_integer()]
 
    suma = sum(array_values)

    if suma == value: 
        return "perfecto"
    elif suma < value :
        return "defectivo"
    else :
        return "abundante"



if __name__== "__main__":    
    print (func_type_number(6) )
