def movehashtofront( text: str ):
    
    
    final_str = ''
    hashcount = ''
    for char in list(text):
        if char == '#':
            hashcount = hashcount + char
        
        else:
            final_str = final_str + char
            
    return hashcount + final_str    


print(movehashtofront('In#tui#tC#odi#ng'))



subArray = [ 1,2,3,-1,2]
def subArraySumEqual( list , k):
    count = 0
    for i in range(len(list)):
        total = 0
        for j in range(i, len(list)):
            total += list[j]
            if total == k:
                count += 1
    
    return count
        
        
                
print(subArraySumEqual(subArray, 2))