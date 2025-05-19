package com.example.tpprincipal;

import android.os.Build;
import android.os.Bundle;
import android.text.Html;
import android.text.method.LinkMovementMethod;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        TextView linkedin = findViewById(R.id.linkedin);
        TextView instagram = findViewById(R.id.instagram);
        TextView email = findViewById(R.id.email);


        String linkedinLink = "<a href='https://www.linkedin.com/in/khalid-abouelfaraj-75314a253/'> LinkedIn</a>";
        String instagramLink = "<a href='https://www.instagram.com/khalid.abouelfaraj'> Instagram</a>";
        String emailLink = "<a href='mailto:khalidabouelfaraj@371.gmail.com'>Email</a>";

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            linkedin.setText(Html.fromHtml(linkedinLink, Html.FROM_HTML_MODE_LEGACY));
            instagram.setText(Html.fromHtml(instagramLink, Html.FROM_HTML_MODE_LEGACY));
            email.setText(Html.fromHtml(emailLink, Html.FROM_HTML_MODE_LEGACY));
        } else {
            linkedin.setText(Html.fromHtml(linkedinLink));
            instagram.setText(Html.fromHtml(instagramLink));
            email.setText(Html.fromHtml(emailLink));
        }

        linkedin.setMovementMethod(LinkMovementMethod.getInstance());
        instagram.setMovementMethod(LinkMovementMethod.getInstance());
        email.setMovementMethod(LinkMovementMethod.getInstance());

        linkedin.setContentDescription("Lien vers profil LinkedIn de Khalid Abouelfaraj");
        instagram.setContentDescription("Lien vers profil Instagram de Khalid");
        email.setContentDescription("Lien pour envoyer un email à Khalid");
    }
}
