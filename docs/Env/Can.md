---
lang: zh-CN
title: CAN Debug
description: some description
---

## check version

```shell
cat /etc/os-release

PRETTY_NAME="Kali GNU/Linux Rolling"
NAME="Kali GNU/Linux"
VERSION_ID="2024.3"
VERSION="2024.3"
VERSION_CODENAME=kali-rolling
ID=kali
ID_LIKE=debian
HOME_URL="https://www.kali.org/"
SUPPORT_URL="https://forums.kali.org/"
BUG_REPORT_URL="https://bugs.kali.org/"
ANSI_COLOR="1;31"

uname -r
6.8.11-arm64

uname -m
aarch64

lsb_release -a

No LSB modules are available.
Distributor ID: Kali
Description:    Kali GNU/Linux Rolling
Release:        2024.3
Codename:       kali-rolling
```

<table data-start="1273" data-end="1607"><thead data-start="1273" data-end="1294"><tr data-start="1273" data-end="1294"><th data-start="1273" data-end="1283">Command</th><th data-start="1283" data-end="1294">Purpose</th></tr></thead><tbody data-start="1317" data-end="1607"><tr data-start="1317" data-end="1372"><td><code data-start="1319" data-end="1340">cat /etc/os-release</code></td><td>Show <strong data-start="1348" data-end="1370">Kali Linux version</strong></td></tr><tr data-start="1373" data-end="1413"><td><code data-start="1375" data-end="1385">uname -r</code></td><td>Show <strong data-start="1393" data-end="1411">kernel version</strong></td></tr><tr data-start="1414" data-end="1466"><td><code data-start="1416" data-end="1432">lsb_release -a</code></td><td>Show <strong data-start="1440" data-end="1464">distribution details</strong></td></tr><tr data-start="1467" data-end="1531"><td><code data-start="1469" data-end="1479">uname -m</code></td><td>Show <strong data-start="1487" data-end="1510">system architecture</strong> (32-bit or 64-bit)</td></tr><tr data-start="1532" data-end="1607"><td>`dpkg-query -W</td><td>grep kali`</td></tr></tbody></table>

## Prepare

```shell
sudo apt update
sudo apt install can-utils python3 python3-pip

# not work
# pip install pycryptodome

# work
sudo apt install python3-pycryptodome

```

### Set up Virtual CAN interface

```shell
sudo modprobe
vcan sudo ip link add dev vcan0 type vcan
sudo ip link set up vcan0
```

- `modprobe` loads kernel modules.
- `vcan` is the virtual CAN module, which allows you to create software-based CAN interfaces for testing.
- This does not create a CAN interface; it just enables the vcan functionality.

## Replay Attack (Without Security)

### Simulate a Mock ECU Sending Messages

```shell
cangen vcan0 -I 123 -L 8 -D 1122334455667788 -v -g 100

# Generate Random Data
cangen vcan0 -I 123 -L 8 -v -g 100

# Generate Incremental Data
cangen vcan0 -I 123 -L 8 -D i -v -g 100

# Send Messages Faster (Reduce Delay)
cangen vcan0 -I 123 -L 8 -D 1122334455667788 -v -g 10

# Limit the Number of Messages
# Sends only 10 messages, then stops.
cangen vcan0 -I 123 -L 8 -D 1122334455667788 -v -g 100 -n 10

```

<table data-start="207" data-end="602"><thead data-start="207" data-end="227"><tr data-start="207" data-end="227"><th data-start="207" data-end="216">Option</th><th data-start="216" data-end="227">Meaning</th></tr></thead><tbody data-start="249" data-end="602"><tr data-start="249" data-end="301"><td><code data-start="251" data-end="265">cangen vcan0</code></td><td>Sends CAN frames on <strong data-start="288" data-end="299"><code data-start="290" data-end="297">vcan0</code></strong></td></tr><tr data-start="302" data-end="346"><td><code data-start="304" data-end="312">-I 123</code></td><td>Uses <strong data-start="320" data-end="338">CAN ID <code data-start="329" data-end="336">0x123</code></strong> (hex)</td></tr><tr data-start="347" data-end="395"><td><code data-start="349" data-end="355">-L 8</code></td><td>Sets <strong data-start="363" data-end="378">data length</strong> to <strong data-start="382" data-end="393">8 bytes</strong></td></tr><tr data-start="396" data-end="486"><td><code data-start="398" data-end="419">-D 1122334455667788</code></td><td>Uses <strong data-start="427" data-end="449">fixed data payload</strong> (<code data-start="451" data-end="476">11 22 33 44 55 66 77 88</code> in hex)</td></tr><tr data-start="487" data-end="545"><td><code data-start="489" data-end="493">-v</code></td><td>Enables <strong data-start="504" data-end="522">verbose output</strong> (prints sent frames)</td></tr><tr data-start="546" data-end="602"><td><code data-start="548" data-end="556">-g 100</code></td><td><strong data-start="559" data-end="575">100 ms delay</strong> between sending messages</td></tr></tbody></table>

### Expected Output

```css
vcan0  123   [8]  11 22 33 44 55 66 77 88
vcan0  123   [8]  11 22 33 44 55 66 77 88
vcan0  123   [8]  11 22 33 44 55 66 77 88
```

explain

- `vcan0` → Interface
- `123` → CAN ID (`0x123` in hex)
- `[8]` → Data length (DLC)
- `11 22 33 44 55 66 77 88` → Payload

### Monitor Message

```sh
candump vcan0
```

### Summary

<table data-start="1871" data-end="2297"><thead data-start="1871" data-end="1892"><tr data-start="1871" data-end="1892"><th data-start="1871" data-end="1881">Command</th><th data-start="1881" data-end="1892">Purpose</th></tr></thead><tbody data-start="1915" data-end="2297"><tr data-start="1915" data-end="2019"><td><code data-start="1917" data-end="1973">cangen vcan0 -I 123 -L 8 -D 1122334455667788 -v -g 100</code></td><td>Send <strong data-start="1981" data-end="1990">fixed</strong> CAN frames every <strong data-start="2008" data-end="2017">100ms</strong></td></tr><tr data-start="2020" data-end="2105"><td><code data-start="2022" data-end="2058">cangen vcan0 -I 123 -L 8 -v -g 100</code></td><td>Send <strong data-start="2066" data-end="2076">random</strong> CAN frames every <strong data-start="2094" data-end="2103">100ms</strong></td></tr><tr data-start="2106" data-end="2185"><td><code data-start="2108" data-end="2149">cangen vcan0 -I 123 -L 8 -D i -v -g 100</code></td><td>Send <strong data-start="2157" data-end="2172">incremental</strong> CAN frames</td></tr><tr data-start="2186" data-end="2254"><td><code data-start="2188" data-end="2223">cangen vcan0 -I 123 -L 8 -v -g 10</code></td><td>Send frames <strong data-start="2238" data-end="2252">every 10ms</strong></td></tr><tr data-start="2255" data-end="2297"><td><code data-start="2257" data-end="2272">candump vcan0</code></td><td>Capture CAN messages</td></tr></tbody></table>

## Capture and Log Messages

```sh
candump vcan0 > captured_can_log.txt

cat captured_can_log.txt
  vcan0  123   [8]  11 22 33 44 55 66 77 88
  vcan0  123   [8]  11 22 33 44 55 66 77 88
  vcan0  123   [8]  11 22 33 44 55 66 77 88
  vcan0  123   [8]  11 22 33 44 55 66 77 88
  vcan0  123   [8]  11 22 33 44 55 66 77 88
  ...
```

```sh
candump -l vcan0 > captured_can_log.txt

cat candump-2025-03-02_104339.log
(1740930219.186591) vcan0 123#1122334455667788
(1740930219.287877) vcan0 123#1122334455667788
(1740930219.388586) vcan0 123#1122334455667788
(1740930219.489370) vcan0 123#1122334455667788
(1740930219.593078) vcan0 123#1122334455667788
(1740930219.695327) vcan0 123#1122334455667788
...
```

### Python Environment

```
$ python3 receive_secoc_can.py 
Traceback (most recent call last):
  File "/home/parallels/Documents/Test/lab3/receive_secoc_can.py", line 5, in <module>
    from Crypto.Cipher import AES
ModuleNotFoundError: No module named 'Crypto'
                                                                                                                                           
$ pip install pycryptodome

error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try apt install
    python3-xyz, where xyz is the package you are trying to
    install.
    
    If you wish to install a non-Debian-packaged Python package,
    create a virtual environment using python3 -m venv path/to/venv.
    Then use path/to/venv/bin/python and path/to/venv/bin/pip. Make
    sure you have python3-full installed.
    
    If you wish to install a non-Debian packaged Python application,
    it may be easiest to use pipx install xyz, which will manage a
    virtual environment for you. Make sure you have pipx installed.
    
    See /usr/share/doc/python3.13/README.venv for more information.

note: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.
hint: See PEP 668 for the detailed specification.
```


### Check

```shell
dpkg -L python3-pycryptodome | grep Crypto

```

### Env

```sh
sudo apt update
sudo apt install python3-venv

sudo apt install python3.13-venv

python3 -m venv --help

```

```sh
# create env
python3 -m venv myenv

source myenv/bin/activate
source ~/myenv/bin/activate

pip install pycryptodome
pip install python-can


python3 -c "from Cryptodome.Util.Padding import pad, unpad; print('PyCryptodome installed!')"

pip list | grep pycryptodome

python3 -m pip show pycryptodome
Name: pycryptodome
Version: 3.21.0
Summary: Cryptographic library for Python
Home-page: https://www.pycryptodome.org
Author: Helder Eijs
Author-email: helderijs@gmail.com
License: BSD, Public Domain
Location: /home/parallels/myenv/lib/python3.13/site-packages
Requires: 
Required-by: 
```


### check pad function

```sh
pwd
/home/parallels/myenv/lib/python3.13/site-packages/Crypto/Util

ls
asn1.py      _cpu_features.py   _file_system.pyi  Padding.py     __pycache__   RFC1751.pyi
asn1.pyi     _cpu_features.pyi  __init__.py       Padding.pyi    _raw_api.py   _strxor.abi3.so
Counter.py   _cpuid_c.abi3.so   number.py         py3compat.py   _raw_api.pyi  strxor.py
Counter.pyi  _file_system.py    number.pyi        py3compat.pyi  RFC1751.py    strxor.pyi


$ grep 'def pad' Padding.py
def pad(data_to_pad, block_size, style='pkcs7'):


```
### Add VCan

```sh
sudo ip link set vcan0 down
sudo ip link set vcan0 up


sudo ip link delete vcan0 type vcan
sudo ip link add dev vcan0 type vcan
sudo ip link set up vcan0


ip -details -statistics link show vcan0

ip link show type can

# check Can
python3 -c "import can; can.Bus(channel='vcan0', interface='socketcan').shutdown()"
```

## Debug

Issue in send_secop_can.py
The error "OSError: [Errno 22] Invalid argument" occurs because CAN frames are limited to a maximum of 8 bytes of data, but your script is trying to send 16 bytes.

