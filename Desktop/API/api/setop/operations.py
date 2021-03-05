def union_op(a, b):

    for i in b:
        if i in a:
            continue
        else:
            a.append(i)
    return a

def diff_op(a, b):

    c = a[:]
    for i in c:
        print(i)
        if i in b:
            print(str(i) + " is in b")
            a.remove(i)
    print(a)
    return a

def intersect_op(a, b):
    
    c = []
    for i in a:
        if i in b:
            c.append(i)

    return c