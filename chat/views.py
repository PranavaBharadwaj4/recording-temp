import os
from chat.models import Chat
import speech_recognition as sr
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from rest_framework import viewsets, permissions

def home(request):

    chats = Chat.objects.all()
    all_users = User.objects.filter(messages__isnull=False).distinct()
    ctx = {
        'home': 'active',
        'chat': chats,
        'allusers': all_users,

    }
    # def get_queryset(self):
    #     username = self.request.query_params.get('username', None)
    #     if username is not None:
    #         print('this is the username in the query string', hash)
    #         print(User.objects.filter(username=username))
    #         linkObject = AppointmentLink.objects.filter(hash=hash)
    #         # print(linkObject.get('doctor_name'))
    #         return AppointmentLink.objects.filter(hash=hash)
    if request.user.is_authenticated:
        return render(request, 'index.html', ctx)
    else:
        return render(request, 'index.html', ctx)


def upload(request):
    permission_classes = [permissions.AllowAny]
    customHeader = request.META['HTTP_MYCUSTOMHEADER']

    # obviously handle correct naming of the file and place it somewhere like media/uploads/
    filename = str(Chat.objects.count())
    filename = filename + "name" + ".wav"
    uploadedFile = open(filename, "wb")
    # the actual file is in request.body
    uploadedFile.write(request.body)
    uploadedFile.close()
    # put additional logic like creating a model instance or something like this here
    r = sr.Recognizer()
    harvard = sr.AudioFile(filename)
    with harvard as source:
        audio = r.record(source)
    msg = r.recognize_google(audio)
    os.remove(filename)
    chat_message = Chat(user=request.user, message=msg)
    if msg != '':
        chat_message.save()
    return redirect('/')


def post(request):
    if request.method == "POST":
        msg = request.POST.get('msgbox', None)
        print('Our value = ', msg)
        chat_message = Chat(user=request.user, message=msg)
        if msg != '':
            chat_message.save()
        return JsonResponse({'msg': msg, 'user': chat_message.user.username})
    else:
        return HttpResponse('Request should be POST.')


def messages(request):
    chat = Chat.objects.all()
    return render(request, 'index.html', {'chat': chat})
