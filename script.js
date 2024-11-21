document.getElementById('click').onclick = function() 

{
    let petType = document.getElementById('pet-type').value;
    let petQuantity = document.getElementById('pet-quantity').value;
    let petColor = document.getElementById('pet-color').value;

    if (petQuantity >= 2)
    {
        document.getElementById('output').innerHTML = ("You ordered " + petQuantity + " " + petColor + " " + petType + "s")
    }
    else
    {
            document.getElementById('output').innerHTML = ("You ordered " + petQuantity + " " + petColor + " " + petType)
    }


}
