import urllib.request
import re
import logging
import socket
#!/usr/bin/python3
timeout = 60 
socket.setdefaulttimeout(timeout)

logging.basicConfig(filename='moves.log',
                    format='%(asctime)s -%(name)s-%(levelname)s-%(module)s:%(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S %p',
                    level=logging.INFO)

def GetMoves():
	baseurl = "http://dex.pokeuniv.com/zh/move-"
	for i in [728]:#range(1, 728):#range(1, 728):
		tempurl = baseurl + str(i);
		filename = "move-" + str(i)+".json"
		filepath = 'moves\\' + filename
		try:
			logging.info('start get ' + filename)
			data = urllib.request.urlopen(tempurl).read()
			data = data.decode('UTF-8','ignore')
			data = data.replace('\n', '')
			data = data.replace(' ','')
			data = MovesFilter(data, filename)
			file = open(filepath,'w+',encoding= 'utf8')
			file.write(data)
			file.close()
			logging.info(filename + ' saved')
		except Exception as e:
			logging.info(filename + 'get failed ')


def MovesFilter(htmldata, filename):
	#print(htmldata)
	m = re.search(r'app.factory(.)*};}\);', htmldata)
	if m:
		logging.info('match success')
		data = m.group(0)
		data = re.sub(r'app.factory\(\'move\',function\(\){return','',data)
		data = re.sub(r';}\);','',data)
		return data
	else:
		logging.error(filename + 'No match')


GetMoves()