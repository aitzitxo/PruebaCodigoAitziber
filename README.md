# Ejercicio 1:

It is a python script with two implementations:
* func_type_number: the list of values is created by using a for loop. 
* func_type_number2: the list of values is created by using a list comprehension 

If executed with `python Ejercicio1.py` the code will run func_type_number with the value 6. 




# Ejercicio 2: 

It is a web page with two highcharts plots:
* Chart1: it is a line chart that shows data from 3 JSON files grouped by CAT
* Chart2: it is a pie chart that shows the aggregation of Chart1

The code is structured as follows:
* Configuration of Chart1
* Configuration of Chart2
* Definition of JSON URLs
* Function `executeAjax`: 
    * Fech URL
    * On success:
        * Parse JSON values
        * Add values to Chart1
        * Add values to Chart2
* Ejecute function `executeAjax`for each URL


