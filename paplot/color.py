# -*- coding: utf-8 -*-
"""
Created on Thu May 12 12:34:57 2016

@author: okada

$Id: color.py 106 2016-05-25 08:54:02Z aokada $
"""

## colors list
metro_colors = ["#F39600","#E60011","#9CAEB7","#E85299","#00A4DB","#009943","#D7C447","#6BBB5A","#00ADA6","#007AC2","#B6007B","#9B7CB6","#BB651D",];
osaka_subway_colors = ["#E51721","#0079BA","#019A68","#522886","#E44D92","#814721","#A9CC51","#EE7A1A","#00A1DE"];
nagoya_subway_colors = ["#FFCD00","#9567CD","#BD332C","#009ACD","#FD64CB"];

name_value = {"black":"#000000","aliceblue":"#f0f8ff","darkcyan":"#008b8b","lightyellow":"#ffffe0","coral":"#ff7f50","dimgray":"#696969","lavender":"#e6e6fa","teal":"#008080","lightgoldenrodyellow":"#fafad2","tomato":"#ff6347","gray":"#808080","lightsteelblue":"#b0c4de","darkslategray":"#2f4f4f","lemonchiffon":"#fffacd","orangered":"#ff4500","darkgray":"#a9a9a9","lightslategray":"#778899","darkgreen":"#006400","wheat":"#f5deb3","red":"#ff0000","silver":"#c0c0c0","slategray":"#708090","green":"#008000","burlywood":"#deb887","crimson":"#dc143c","lightgrey":"#d3d3d3","steelblue":"#4682b4","forestgreen":"#228b22","tan":"#d2b48c","mediumvioletred":"#c71585","gainsboro":"#dcdcdc","royalblue":"#4169e1","seagreen":"#2e8b57","khaki":"#f0e68c","deeppink":"#ff1493","whitesmoke":"#f5f5f5","midnightblue":"#191970","mediumseagreen":"#3cb371","yellow":"#ffff00","hotpink":"#ff69b4","white":"#ffffff","navy":"#000080","mediumaquamarine":"#66cdaa","gold":"#ffd700","palevioletred":"#db7093","snow":"#fffafa","darkblue":"#00008b","darkseagreen":"#8fbc8f","orange":"#ffa500","pink":"#ffc0cb","ghostwhite":"#f8f8ff","mediumblue":"#0000cd","aquamarine":"#7fffd4","sandybrown":"#f4a460","lightpink":"#ffb6c1","floralwhite":"#fffaf0","blue":"#0000ff","palegreen":"#98fb98","darkorange":"#ff8c00","thistle":"#d8bfd8","linen":"#faf0e6","dodgerblue":"#1e90ff","lightgreen":"#90ee90","goldenrod":"#daa520","magenta":"#ff00ff","antiquewhite":"#faebd7","cornflowerblue":"#6495ed","springgreen":"#00ff7f","peru":"#cd853f","fuchsia":"#ff00ff","papayawhip":"#ffefd5","deepskyblue":"#00bfff","mediumspringgreen":"#00fa9a","darkgoldenrod":"#b8860b","violet":"#ee82ee","blanchedalmond":"#ffebcd","lightskyblue":"#87cefa","lawngreen":"#7cfc00","chocolate":"#d2691e","plum":"#dda0dd","bisque":"#ffe4c4","skyblue":"#87ceeb","chartreuse":"#7fff00","sienna":"#a0522d","orchid":"#da70d6","moccasin":"#ffe4b5","lightblue":"#add8e6","greenyellow":"#adff2f","saddlebrown":"#8b4513","mediumorchid":"#ba55d3","navajowhite":"#ffdead","powderblue":"#b0e0e6","lime":"#00ff00","maroon":"#800000","darkorchid":"#9932cc","peachpuff":"#ffdab9","paleturquoise":"#afeeee","limegreen":"#32cd32","darkred":"#8b0000","darkviolet":"#9400d3","mistyrose":"#ffe4e1","lightcyan":"#e0ffff","yellowgreen":"#9acd32","brown":"#a52a2a","darkmagenta":"#8b008b","lavenderblush":"#fff0f5","cyan":"#00ffff","darkolivegreen":"#556b2f","firebrick":"#b22222","purple":"#800080","seashell":"#fff5ee","aqua":"#00ffff","olivedrab":"#6b8e23","indianred":"#cd5c5c","indigo":"#4b0082","oldlace":"#fdf5e6","turquoise":"#40e0d0","olive":"#808000","rosybrown":"#bc8f8f","darkslateblue":"#483d8b","ivory":"#fffff0","mediumturquoise":"#48d1cc","darkkhaki":"#bdb76b","darksalmon":"#e9967a","blueviolet":"#8a2be2","honeydew":"#f0fff0","darkturquoise":"#00ced1","palegoldenrod":"#eee8aa","lightcoral":"#f08080","mediumpurple":"#9370db","mintcream":"#f5fffa","lightseagreen":"#20b2aa","cornsilk":"#fff8dc","salmon":"#fa8072","slateblue":"#6a5acd","azure":"#f0ffff","cadetblue":"#5f9ea0","beige":"#f5f5dc","lightsalmon":"#ffa07a","mediumslateblue":"#7b68ee",}

def pickup_color(color_list, index):
    pos = index % len(color_list)
    return color_list[pos]
    
def create_color_dict(keys, partial_dict, color_list):
    di = {}
    counter = 0
    for key in keys:
        if partial_dict.has_key(key):
            di[key] = partial_dict[key]
        else:
            di[key] = color_list[counter]
            counter += 1
            if counter >= len(color_list): counter = 0
    
    return di

def name_to_value(name):
    if name_value.has_key(name.lower()):
        return name_value[name.lower()]
    
    return name
    
def Saturation_down_list(color_list):
    sat_list = []
    for c in color_list:
        sat_list.append(Saturation_down(c))
    
    return sat_list
    
def Saturation_down(color):
    param_s = 0.3
    param_v = 1.5
    
    # RGB -> [R, G, B]
    R = int(color[1:3], 16)
    G = int(color[3:5], 16)
    B = int(color[5:7], 16)
    MAX = max([R,G,B])
    MIN = min([R,G,B])
    
    # RGB -> S
    S = float(MAX - MIN) / float(MAX)*255.0
    S = S*param_s
    
    # RGB -> Hue
    if R == G and R == B:
        H = 0
    elif R > G and R > B:
        H = 60.0 * (float(G - B) / float(MAX - MIN))
    elif G > R and G > B:
        H = 60.0 * (float(B - R) / float(MAX - MIN)) + 120.0
    else:
        H = 60.0 * (float(R - G) / float(MAX - MIN)) + 240.0

    # RGB -> V
    V = float(MAX)
    
    # HSV -> RGB
    MAX = V * param_v
    if MAX > 255: MAX = 255
    MIN = MAX - ((S / 255.0) * MAX)
    
    if H < 60:
        R = MAX
        G = (H / 60) * (MAX - MIN) + MIN
        B = MIN 
    elif H < 120:
        R = ((120 - H) / 60) * (MAX - MIN) + MIN
        G = MAX
        B = MIN
    elif H < 180:
        R = MIN
        G = MAX
        B = ((H - 120) / 60) * (MAX - MIN) + MIN
    elif H < 240:
        R = MIN
        G = ((240 - H) / 60) * (MAX - MIN) + MIN
        B = MAX
    elif H < 300:
        R = ((H - 240) / 60) * (MAX - MIN) + MIN
        G = MIN
        B = MAX
    else: # < 360
        R = MAX
        G = MIN
        B = ((360 - H) / 60) * (MAX - MIN) + MIN 
        
    x = "#" + format(int(R), '02x') + format(int(G), '02x') + format(int(B), '02x')
    
    return x

def create_gradient(colors, length):

    v0 = 0
    v1 = length-1
    color_array = []
    
    for value in range(length):
        color = "#";
        for i in range(3):
            
            c0 = int(colors[0][2*i+1:2*i+3], 16);
            c1 = int(colors[1][2*i+1:2*i+3], 16);
            
            c = c0 + ((value - v0) * (c1 - c0)) / ((v1 - v0))
            if (c > 255): c = 255
            if (c < 0): c = 0
    
            color = color + "%02x" % round(c)

        color_array.append(color)

    return color_array

def create_rainbow_array(length, mid_colors):
    #RAINBOWS = ["#FE0000","#FF9C00","#F5FF00","#3CF10E","#01FFE5","#0024FF","#C500FF"]
    
    if length < 1:
        return []
    elif length <= len(mid_colors):
        return mid_colors[0:length]
        
    array = []
    mod = (length-1) % (len(mid_colors)-1)
    step_def = (length-1-mod) / (len(mid_colors)-1) + 1
    array = []
    for i in range((len(mid_colors)-1)):
        step = step_def
        if i < mod:
            step += 1

        if step >= 3:
            array.extend(create_gradient([mid_colors[i], mid_colors[i+1]], step)[0:-1])
        else:
            array.extend([mid_colors[i]])
        
    array.extend([mid_colors[-1]])
    
    return array
    
if __name__ == "__main__":
    """
    print "<html>\r\n<head></head>\r\n<body>\r\n<table>"

    for cpos in range(len(metro_colors)):
        print "<tr><td bgcolor=" + metro_colors[cpos] + ">" + metro_colors[cpos] + "</td>"
        print "<td bgcolor=" + metro_colors_hi[cpos] + ">" + metro_colors_hi[cpos] + "</td>"
        hi = Saturation_down(metro_colors[cpos])
        print "<td bgcolor=" + hi + ">" + hi + "</td></tr>\r\n"

    print "</table>\r\n</body>\r\n</html>"
    """
    
    #print name_to_value("blue")
    #print create_gradient(["#FF0000","#0000FF"],3)

    RAINBOWS = ["#FE0000","#FF9C00","#F5FF00","#3CF10E","#01FFE5","#0024FF","#C500FF"]
    
    f=open("rainbow.html", "w")
    f.write("<html>\r\n<head></head>\r\n<body>\r\n<li>")

    for l in range(32):
        f.write("<ul> len:%02d" % l)
        for color in create_rainbow_array(l, RAINBOWS):
            f.write("<font color='%s'>■</font>" % color)
        f.write("</ul>")

    f.write("</li>\r\n</body>\r\n</html>")
    f.close()
    







