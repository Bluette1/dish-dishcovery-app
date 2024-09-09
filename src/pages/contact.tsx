// pages/contact.js
import Head from 'next/head';

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact Us | Meal Service</title>
        <meta name="description" content="Contact us to get in touch or find our location." />
      </Head>
      
      <main>
       

        {/* Contact Section */}
        <section id="contact" className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-semibold text-gray-800 mb-4">Contact Us</h1>
              <p className="text-lg text-gray-600">We'd love to hear from you! Get in touch with us using the contact form below or through our social media channels.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  <strong>Address:</strong><br />
                  1234 Meal Street, Food City, FL 12345
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Phone:</strong><br />
                  <a href="tel:+1234567890" className="text-blue-500 hover:underline">(123) 456-7890</a>
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Email:</strong><br />
                  <a href="mailto:info@dishdiscovery.com" className="text-blue-500 hover:underline">info@dishdiscovery.com</a>
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-500 hover:underline">Facebook</a>
                  <a href="#" className="text-blue-500 hover:underline">Instagram</a>
                  <a href="#" className="text-blue-500 hover:underline">Twitter</a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
                <form action="#" method="POST">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                    <input type="text" id="name" name="name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <input type="email" id="email" name="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                    <textarea id="message" name="message" rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required></textarea>
                  </div>
                  <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Meet The Founder Section */}
        <section id="meet-the-founder" className="py-12 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Meet The Founder</h2>
              <p className="text-lg text-gray-600">Get to know the person behind our delicious meals.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <img src="/images/founder.jpg" alt="Founder" className="w-full h-auto rounded-full shadow-lg" />
              </div>
              <div className="md:w-2/3 md:pl-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Jane Doe</h3>
                <p className="text-gray-600 mb-4">
                  Jane Doe is the passionate founder behind our meal service. With a love for healthy, delicious food, Jane has spent years perfecting recipes that delight our customers.
                </p>
                <p className="text-gray-600 mb-4">
                  When not in the kitchen, Jane enjoys exploring local farmers' markets and developing new recipes. She is committed to sustainability and community, making every meal a reflection of these values.
                </p>
                <a href="mailto:jane.doe@example.com" className="text-blue-500 hover:underline">Contact Jane</a>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Find Us</h2>
              <p className="text-lg text-gray-600">Visit us at our location or use the map below to find your way.</p>
            </div>
            <div className="relative w-full h-96">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.779978951853!2d-122.40641738469003!3d37.785263979757704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808e6393f7f9%3A0x4271ae61db4381fc!2s1234%20Meal%20Street%2C%20San%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1634111615411!5m2!1sen!2sus"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"></iframe>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
