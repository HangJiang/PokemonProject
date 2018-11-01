import urllib.request
import re
import logging
#!/usr/bin/python3

logging.basicConfig(filename='pokedex.log',
                    format='%(asctime)s -%(name)s-%(levelname)s-%(module)s:%(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S %p',
                    level=logging.INFO)

def GetPokedex():
	baseurl = "http://dex.pokeuniv.com/zh/pokemon-"
	for i in [809]: #range(1, 803):
		tempurl = baseurl + str(i);
		filename = "pokemon-" + str(i)+".json"
		filepath = 'pokedex\\' + filename
		try:
			logging.info('start get ' + filename)
			data = urllib.request.urlopen(tempurl).read()
			data = data.decode('UTF-8','ignore')
			data = data.replace('\n', '')
			data = data.replace(' ','')
			data = PokedexFilter(data, filename)
			file = open(filepath,'w+',encoding= 'utf8')
			file.write(data)
			file.close()
			logging.info(filename + ' saved')
		except Exception as e:
			logging.info(filename + 'get failed ')

//asdasdasd
def PokedexFilter(htmldata, filename):
	#print(htmldata)
	m = re.search(r'app.factory(.)*};}\);', htmldata)
	if m:
		logging.info('match success')
		data = m.group(0)
		data = re.sub(r'app.factory\(\'pokemon\',function\(\){return','',data)
		data = re.sub(r';}\);','',data)
		return data
	else:
		logging.error(filename + 'No match')




GetPokedex()
