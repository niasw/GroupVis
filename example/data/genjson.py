#!/usr/bin/python3
import re;
import json;
def genjson(csvfile,jsonfile):
  cf=open(csvfile,'r');
  cf.seek(0);
  tl=cf.readline();
  tl=re.sub('\n','',tl);
  tld=re.split(',',tl);
  tld.pop(0); #remove label
  nodes=tld;
  print('nodes=');
  print(nodes);
  num=len(nodes);
  tb=[]; #empty table
  it=0;
  while it<num:
    tb.append([]);
    it+=1;
  while tl:
    tl=cf.readline();
    tl=re.sub('\n','',tl);
    tld=re.split(',',tl);
    it=tld.pop(0);
    if (len(tld)<num):
      break;
    tb[nodes.index(it)]=tld;
  for it in tb:
    if (len(it)<num):
      print('!error when parsing multiplication table!');
      print('line:');
      print(it);
  print('multiplication table:');
  print(tb);
  #generate json from tb
  cf.close();
  jsontxt=[];
  it1=0;
  while it1<num:
    it2=0;
    while it2<num:
      jsontxt.append({'left':nodes[it1],'right':nodes[it2],'result':tb[it1][it2]});
      it2+=1;
    it1+=1;
  jsontxt={'nodes':nodes,'table':jsontxt};
  cf=open(jsonfile,'w');
  cf.write(json.dumps(jsontxt));
genjson('D3group.csv','D3group.json');
