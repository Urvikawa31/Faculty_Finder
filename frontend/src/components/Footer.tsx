import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* CENTER WRAPPER */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">

            {/* BRAND */}
            <div>
              <h3 className="text-xl font-bold mb-4">Faculty Finder</h3>
              <p className="text-green-100 text-sm max-w-xs mx-auto">
                AI-Powered Research Collaboration Platform for discovering relevant faculty expertise
              </p>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-sm text-green-100">
                <div className="flex justify-center gap-2">
                  <MapPin size={16} />
                  <span>DA-IICT Road, Gandhinagar 382007, Gujarat (India)</span>
                </div>
                <div className="flex justify-center gap-2">
                  <Phone size={16} />
                  <span>(+91) 7016482939</span>
                </div>
                <div className="flex justify-center gap-2">
                  <Phone size={16} />
                  <span>(+91) 6354394636</span>
                </div>
                <div className="flex justify-center gap-2">
                  <Mail size={16} />
                  <span>urvikawa2004@gmail.com</span>
                </div>
                <div className="flex justify-center gap-2">
                  <Mail size={16} />
                  <span>harshpatel08050@gmail.com</span>
                </div>
              </div>
            </div>

            {/* TEAM */}
            <div>
              <h4 className="font-semibold mb-4">Project Team</h4>
              <div className="space-y-2 text-sm text-green-100">
                <div className="flex justify-center gap-2">
                  <a href="https://www.linkedin.com/in/urvikava31" target="_blank">
                    <Linkedin size={18} />
                  </a>
                  <span>Urvi Kava</span>
                </div>
                <div className="flex justify-center gap-2">
                  <a href="https://www.linkedin.com/in/harsh-patel-57540922a" target="_blank">
                    <Linkedin size={18} />
                  </a>
                  <span>Harsh Patel</span>
                </div>
                <div className="flex justify-center gap-2">
                  <a href="https://github.com/Urvikawa31/Faculty_Finder" target="_blank">
                    <Github size={18} />
                  </a>
                  <span>Infraglyph</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-green-600 mt-10 pt-6 text-sm text-center text-green-100">
          © 2026 Faculty Finder — AI Research Collaboration Platform. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
