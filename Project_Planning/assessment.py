from collections import defaultdict
logs = [
  "1615380000 192.168.1.10 FAILURE",
  "1615380050 10.0.0.5 SUCCESS",
  "1615380120 192.168.1.10 FAILURE",
  "1615380200 192.168.1.10 FAILURE",
  "1615380250 10.0.0.5 FAILURE"
]

ip_dict = defaultdict(list)
def findSuspiciousIPs(logs):
    ip_dict = {}
    list_logs = [   s.split() for s in logs]
    
    for log in list_logs:
        time = int(log[0])
        ip = log[1]
        status = log[2]
        
        if ip not in ip_dict:
            ip_dict[ip] = {
                "time" : [time],
                "status" : [status]
            }
            
        else:
            ip_dict[ip]["time"].append(time)
            ip_dict[ip]["status"].append(status)
    
    suspiciosIPs_List = []
    for k, val in ip_dict.items():
        suspiciosStatus = 0
        for i, time in enumerate(val['time']):
            failed = val["status"][i] == "FAILURE"
            
            if failed:
                if i == 0:
                    suspiciosStatus += 1
                    continue
                
                pre_time = ip_dict[k]["time"][i-1]
                if (time - pre_time) <= 300:
                    suspiciosStatus += 1
                else:
                    suspiciosStatus = 0
                    
                if suspiciosStatus == 3:
                    suspiciosIPs_List.append(k)
                    break
                
    suspiciosIPs_List.sort()        
    print(suspiciosIPs_List)    
    return suspiciosIPs_List

findSuspiciousIPs(logs)
