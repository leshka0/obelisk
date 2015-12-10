import pymel.core as pm
import re

indices = []

for v in pm.ls(sl=1, fl=1):
        
    m = re.search(r"\[([A-Za-z0-9_]+)\]", "%s" % v)
   
    index =  m.group(1)
    
    indices.append(index)

print indices